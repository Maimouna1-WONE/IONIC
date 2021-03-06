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
     *     path="/api/transactions/depotua",
     *     name="depotUA",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::depotUA",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_collection_operation_name"="depotUA"
     *     }
     * )
     * @throws \Exception
     */
    public function depotUA(Request $request)
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
     *     path="/api/transactions/depota",
     *     name="depotA",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::depotA",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_collection_operation_name"="depotA"
     *     }
     * )
     * @throws \Exception
     */
    public function depotA(Request $request)
    {
        $dep= json_decode($request->getContent(), true);
        //dd($dep['user_depot']['nom']);
        $depot =  new Transaction();
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
     *     path="/api/transactions/retraitua",
     *     name="retraitUA",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::retraitUA",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_collection_operation_name"="retraitUA"
     *     }
     * )
     * @throws \Exception
     */
    public function retraitUA(Request $request){
        $dep= json_decode($request->getContent(), true);
        $obj= $this->repo->findOneBy(['code' => $dep['code']]);
        if ($obj->getDateRetrait() === null && ($obj->getCompte())->getSolde() >= $dep['montant']){
            $obj->setDateRetrait(new \DateTime);
            $obj->setType("retrait");
            $solde=($obj->getCompte())->getSolde() - $dep['montant'];
            ($obj->getCompte())->setSolde($solde);
        }
        else{
            return $this->json("Retrait impossible",200);
        }
        $errors = $this->validator->validate($obj);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        $this->manager->persist($obj);
        $this->manager->flush();
        return $this->json("Retrait reussi",200);
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
}
