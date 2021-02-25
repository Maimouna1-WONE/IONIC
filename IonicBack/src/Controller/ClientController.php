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
        //dd('ok');
        $dep= json_decode($request->getContent(), true);
        //dd($dep);
        $exp = new Client();
        $exp->setNomComplet($dep['expediteur']['nom_complet']);
        $exp->setTelephone($dep['expediteur']['telephone']);
        $exp->setCni($dep['expediteur']['cni']);
        $dest = new Client();
        $dest->setNomComplet($dep['destinataire']['nom_complet']);
        $dest->setTelephone($dep['destinataire']['telephone']);
        $trans = $this->frais->generateFrais($dep['montant']);
        $code=random_int(10000,99999).''.random_int(100,999);
        $trans->setCode((string)$code);
        $trans->setType("depot");
        $trans->setClientDepot($exp);
        $trans->setClientRetrait($dest);
        $trans->setMontant($dep['montant']);
        ($trans->getCompte())->setSolde(($trans->getCompte())->getSolde() - $dep['montant']);
        $trans->setDateDepot(new  \DateTime());
        $exp->addTransaction($trans);
        $errors = $this->validator->validate($exp);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        $errors = $this->validator->validate($dest);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        //dd($trans);
        //$sms = new SmsMessage($dep['destinataire']['telephone'],'hello');
        //$texter->send($sms);
        //dd('ok');
        $this->manager->persist($exp);
        $this->manager->persist($dest);
        $this->manager->flush();
        return $this->json("Depot reussi",200);
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
        //dd('ok');
        $dep= json_decode($request->getContent(), true);
        $obj= $this->repoC->findOneBy(['code' => $dep['code']]);
        //dd($obj);
        $Tretrait = ($obj->getClientRetrait())->getTelephone();
        if ($obj->getDateRetrait() === null && $Tretrait === $dep['destinataire']['telephone'] && $obj->getMontant() === $dep['montant']){
            $obj->setMontant(0);
            ($obj->getCompte())->setSolde(($obj->getCompte())->getSolde() + $obj->getMontant());
            $obj->setType("retrait");
            $obj->setDateRetrait(new \DateTime());
            ($obj->getClientRetrait())->setCni($dep['destinataire']['cni']);
        }
        else{
            return $this->json("Retrait impossible",200);
        }
        $errors = $this->validator->validate($obj);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        //dd(($obj->getClientRetrait()));
        $this->manager->persist($obj);
        $this->manager->flush();
        return $this->json("Retrait reussi",200);
    }
}
