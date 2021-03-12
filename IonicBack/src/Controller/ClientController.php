<?php

namespace App\Controller;
use App\Entity\Client;
use App\Entity\Transaction;
use App\Entity\User;
use App\Repository\ClientRepository;
use App\Repository\CompteRepository;
use App\Services\FraisServce;
use App\Repository\TransactionRepository;
use App\Repository\UserRepository;
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
use Twilio\Rest;

class ClientController extends AbstractController
{
    private $encoder;
    private $frais;
    private $serializer;
    private $validator;
    private $manager;
    private $repo;
    private $repoU;
    private $repoC;
    private $user;
    public function __construct(UserPasswordEncoderInterface $encoder,
                                FraisServce $frais,
                                TokenStorageInterface $tokenStorage,
                                SerializerInterface $serializer,
                                ValidatorInterface $validator,
                                EntityManagerInterface $manager,
                                ClientRepository $repo,
                                UserRepository $repoU,
                                TransactionRepository $repoC){
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
     *     path="/api/clients/depotclient",
     *     name="depotClient",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\ClientController::depotClient",
     *          "__api_resource_class"=Client::class,
     *          "__api_collection_operation_name"="depotClient"
     *     }
     * )
     * @throws \Exception
     */
    public function depotClient(Request $request)
    {
        $agence=$this->user->getAgence()->getCompte();
        $dep= json_decode($request->getContent(), true);
        if ($agence->getSolde() > $dep['montant']){
            $exp = new Client();
            $exp->setNom($dep['expediteur']['nom']);
            $exp->setPrenom($dep['expediteur']['prenom']);
            $exp->setTelephone($dep['expediteur']['telephone']);
            $exp->setCni($dep['expediteur']['cni']);
            $dest = new Client();
            $dest->setNom($dep['destinataire']['nom']);
            $dest->setPrenom($dep['destinataire']['prenom']);
            $dest->setTelephone($dep['destinataire']['telephone']);
            $trans = $this->frais->generateFrais($dep['montant']);
            $code=random_int(100,999).'-'.random_int(100,999). '-'.random_int(100, 999);
            $trans->setCode((string)$code);
            $trans->setType("depot");
            $trans->setClientDepot($exp);
            $trans->setClientRetrait($dest);
            $trans->setUserDepot($this->user);
            $trans->setMontant($dep['montant']);
            $agence->setSolde(($agence->getSolde() - $dep['montant']) + $trans->getFraisDepot());
            $trans->setCompte($agence);
            $trans->setDateDepot(new \DateTime());
            $exp->addTransaction($trans);
            $agence->addTransaction($trans);
            $errors1 = $this->validator->validate($exp);
            if (count($errors1)){
                $errors = $this->serializer->serialize($errors1,"json");
                return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
            }
            $errors2 = $this->validator->validate($dest);
            if (count($errors2)){
                $errors = $this->serializer->serialize($errors2,"json");
                return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
            }
            // messagerie
            /*$sid = "AC8a13a06d90b747c73802704790b09db1";
            $token = "90a732fb9b9a11ccbf34ed80414093b4";
            $client = new Rest\Client($sid, $token);
            $client->messages->create(
                 '+221777460900', // Text this number
               [
                  'from' => '+16622220486', // From a valid Twilio number
                   'body' => 'Hello from Twilio!'
               ]
            );*/
            $this->manager->persist($exp);
            $this->manager->persist($dest);
            $this->manager->persist($trans);
            $this->manager->flush();
            $obj=$trans;
        }
        else{
            $obj= "impossible de faire un depot, solde insuffisant";
        }

        return $this->json($obj,200);
    }

    /**
     * @Route(
     *     path="/api/clients/retraitclient",
     *     name="retraitClient",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\ClientController::retraitClient",
     *          "__api_resource_class"=Client::class,
     *          "__api_collection_operation_name"="retraitClient"
     *     }
     * )
     * @throws \Exception
     */
    public function retraitClient(Request $request){
        $dep= json_decode($request->getContent(), true);
        $obj= $this->repoC->findOneBy(['code' => $dep['code']]);
        $agence=$this->user->getAgence()->getCompte();
        //dd($agence->getSolde());
        if ($agence->getSolde() >= $obj->getMontant()){
            if ($obj->getDateRetrait() === null ){
                $obj->setMontant(0);
                ($agence)->setSolde(($agence->getSolde() + $obj->getMontant()) + $obj->getFraisRetrait());
                $obj->setType("retrait");
                $obj->setUserRetrait($this->user);
                $obj->setDateRetrait(new \DateTime());
                ($obj->getClientRetrait())->setCni($dep['destinataire']['cni']);
                $agence->setTransaction($obj);
            }
            else{
                return $this->json("Erreur !, Retrait deja effectué",200);
            }
            $errors = $this->validator->validate($obj);
            if (count($errors)){
                $errors = $this->serializer->serialize($errors,"json");
                return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
            }
            //dd($obj);
            $this->manager->persist($obj);
            $this->manager->flush();
            $ok= $obj;
        }
        else{
            $ok= "Solde insuffisant, impossible de faire un retrait";
        }
        return $this->json($ok,200);
    }
}
