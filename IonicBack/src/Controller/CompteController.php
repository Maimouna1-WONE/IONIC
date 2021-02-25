<?php

namespace App\Controller;
use App\Entity\Agence;
use App\Entity\Compte;
use App\Entity\Transaction;
use App\Entity\User;
use App\Repository\CompteRepository;
use App\Repository\TransactionRepository;
use App\Repository\UserRepository;
use App\Services\FraisServce;
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


class CompteController extends AbstractController
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
     *     path="/api/comptes",
     *     name="postCompte",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::postCompte",
     *          "__api_resource_class"=Transaction::class,
     *          "__api_collection_operation_name"="postCompte"
     *     }
     * )
     * @param Request $request
     */
    public function postCompte(Request $request){
        $cmpt= json_decode($request->getContent(), true);
        $compte= new Compte();
        $ag= new Agence();
        $ag->setTelephone($cmpt['agence']['telephone']);
        $ag->setAdresse($cmpt['agence']['adresse']);
        foreach ($cmpt['agence']['users'] as $val){
            $us= $this->repoU->find($val);
            $ag->addUser($us);
        }
        $compte->setAgence($ag);
        $compte->setCreatedAt(new \DateTime);
        $compte->setUser($this->user);
        $compte->setNumero(random_int(100,300).'-'.random_int(400,700).'-'.random_int(800,999));
        //dd($compte);
        $errors = $this->validator->validate($compte);
        if (count($errors)){
            $errors = $this->serializer->serialize($errors,"json");
            return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
        }
        $this->manager->persist($compte);
        $this->manager->flush();
        return $this->json("Compte crée",200);
    }
}
