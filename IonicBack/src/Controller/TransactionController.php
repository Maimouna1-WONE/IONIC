<?php

namespace App\Controller;
use App\Entity\Transaction;
use App\Entity\User;
use App\Repository\CompteRepository;
use App\Repository\TransactionRepository;
use App\Repository\UserRepository;
use App\Services\FraisServce;
use App\Services\TransactionService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Services\UserService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class TransactionController extends AbstractController
{
    private $encoder;
    private $serializer;
    private $validator;
    private $manager;
    private $repo;
    private $frais;
    private $repoU;
    private $repoC;
    private $user;
    public function __construct(UserPasswordEncoderInterface $encoder,
                                TokenStorageInterface $tokenStorage,
                                FraisServce $frais,
                                SerializerInterface $serializer,
                                ValidatorInterface $validator,
                                EntityManagerInterface $manager,
                                TransactionRepository $repo,
                                UserRepository $repoU,
                                CompteRepository $repoC){
        $this->repo=$repo;
        $this->frais=$frais;
        $this->repoU=$repoU;
        $this->repoC=$repoC;
        $this->encoder=$encoder;
        $this->manager=$manager;
        $this->validator=$validator;
        $this->serializer=$serializer;
        $this->user = ($tokenStorage->getToken())->getUser();
    }

    /**
     * @Route(
     *     path="/api/transactions/depotcaissier",
     *     name="depotCaisssier",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::depotCaisssier",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_collection_operation_name"="depotCaisssier"
     *     }
     * )
     * @throws \Exception
     */
    public function depotCaisssier(Request $request)
    {
        $dep= json_decode($request->getContent(), true);
        //dd($dep['user_depot']['nom']);
        $depot = new Transaction();
        $depot->setDateDepot(new \DateTime);
        $code=random_int(10000,99999).''.random_int(100,999);
        $depot->setCode((string)$code);
        $depot->setUserDepot($this->user);
        $dest=$this->repoU->find($dep['user_retrait']);
        $depot->setUserRetrait($dest);
        $depot->setType("depot");
        $depot->setMontant($dep['montant']);
        $compte= $this->repoC->find($dep['compte']);
        if($compte->getSolde() >= 5000){
            $depot->setCompte($compte);
            $compte->setSolde($compte->getSolde() + $depot->getMontant());
        }
        else{
            return $this->json("Solde insuffisant",200);
        }
        $errors = $this->validator->validate($depot);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        $this->manager->persist($depot);
        $this->manager->flush();
        //dd($depot->getCompte()->getSolde());
        return $this->json("Depot reussi",200);
    }

    /**
     * @Route(
     *     path="/api/transactions/{code}",
     *     name="code",
     *     methods={"GET"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::retraitUA",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_item_operation_name"="getTransactionCode"
     *     }
     * )
     * @param string $code
     * @return JsonResponse
     */
    public function code(string $code)
    {
        // $dep= json_decode($request->getContent(), true);
            $obj= $this->repo->findTransaction($code);
        return $this->json($obj,Response::HTTP_OK, [] ,['groups' => ['getcode:read']]);
    }
    /**
     * @Route(
     *     path="/api/transaction/me",
     *     name="getMestransaction",
     *     methods={"GET"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::getMestransaction",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_item_operation_name"="getMestransaction"
     *     }
     * )
     * @return JsonResponse
     */
    public function getMestransaction(): JsonResponse
    {
        //dd('ok');
        $id = $this->user->getId();
        //dd($this->user);
        $transactions = $this->repo->findMesTransaction($id);
        //dd($transactions);
        return $this->json($transactions,Response::HTTP_OK, [] ,['groups' => ['getcode:read']]);
    }

    /**
     * @Route(
     *     path="/api/transactionannule/{code}",
     *     name="deleteTransaction",
     *     methods={"DELETE"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::deleteTransaction",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_item_operation_name"="deleteTransaction"
     *     }
     * )
     * @param string $code
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteTransaction(string $code, Request $request): JsonResponse
    {
        $obj= $this->repo->findTransaction($code);
        $dep= json_decode($request->getContent(), true);
        if ($obj){
            $agenceAnnule=($this->user->getAgence())->getCompte();
            $agence= $obj[0]->getCompte();
            if ($obj[0]->getDateRetrait() === null && $dep['cni'] === $obj[0]->getClientDepot()->getCni()){

                $transAnnule=$this->frais->generateFrais($obj[0]->getMontant());
                $transAnnule->setMontant($obj[0]->getMontant());
                $transAnnule->setDateDepot(new \DateTime());
                $code=random_int(100,999).'-'.random_int(100,999). '-'.random_int(100, 999);
                $transAnnule->setCode((string)$code);
                $transAnnule->setCompte($obj[0]->getUserDepot()->getAgence()->getCompte());
                ($obj[0]->getCompte())->setSolde(($agence->getSolde() - $obj[0]->getMontant()) + $transAnnule->getFraisDepot());
                $transAnnule->setType("depot");
                $transAnnule->setUserDepot($obj[0]->getUserDepot());
                $transAnnule->setUserRetrait($this->user);
                //dd($transAnnule);

                $transAnnule->setUserRetrait($this->user);
                $transAnnule->setType("retrait");
                $transAnnule->setMontant(0);
                $transAnnule->setDateRetrait(new \DateTime());

                //dd($transAnnule);

                $agenceAnnule->setSolde($agence->getSolde() + $obj[0]->getMontant() + $obj[0]->getFraisRetrait() + $transAnnule->getFraisRetrait());
                $obj[0]->setType("retrait");
                $obj[0]->setMontant(0);
                $obj[0]->setUserRetrait($this->user);
                $obj[0]->setDateRetrait(new \DateTime());
                $obj[0]->setStatut(1);
                dd($obj[0]);

                $errors = $this->validator->validate($obj[0]);
                if (count($errors)){
                    $errors = $this->serializer->serialize($errors,"json");
                    return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
                }
                $this->manager->persist($obj[0]);
                $this->manager->flush();
                $ok= "transaction annulée";
            }
            else{
                if ($obj[0]->getDateRetrait() === null){
                    $ok = "Transaction deja retirée";
                }
                else{
                    $ok = "Le CNI ne vous correspond pas";
                }
                //return $this->json("Transaction deja annulée",200);
            }
            //dd($agence);
            /*if ($this->user === $obj[0]->getUserDepot()){
            }
            else{
                //return $this->json("Vous n'etes pas le prestataire",200);
                $ok = "Vous n'etes pas le prestataire";
            }*/
        }
        else{
            $ok = "code introuvable";
        }
            //dd ($obj[0]);
        return $this->json($ok,200);
    }
}
