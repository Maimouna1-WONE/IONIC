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


class AgenceController extends AbstractController
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
     *     path="/api/agences",
     *     name="postAgence",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\TransactionController::postAgence",
     *          "__api_resource_class"=Agence::class,
     *          "__api_collection_operation_name"="postAgence"
     *     }
     * )
     * @param Request $request
     */
    public function postAgence(Request $request){
        if (($this->user->getProfil())->getId() === 1) {
            $cmpt = json_decode($request->getContent(), true);
            //dd($cmpt);
            $ag = new Agence();
            $ag->setTelephone($cmpt['telephone']);
            $ag->setAdresse($cmpt['adresse']);
            foreach ($cmpt['users'] as $val) {
                $us = $this->repoU->find($val);
                $ag->addUser($us);
            }
            $compte = new Compte();
            $compte->setCreatedAt(new \DateTime);
            if ($cmpt['compte']['solde']){
                $compte->setSolde($cmpt['compte']['solde']);
            }
            //$compte->setUser($this->user);
            $compte->setNumero(random_int(100, 300) . '-' . random_int(400, 700) . '-' . random_int(800, 999));
            $ag->setCompte($compte);
            //dd($compte);
            $errors = $this->validator->validate($ag);
            if (count($errors)) {
                $errors = $this->serializer->serialize($errors, "json");
                return new JsonResponse($errors, Response::HTTP_BAD_REQUEST, [], true);
            }
            $this->manager->persist($ag);
            $this->manager->flush();
            $obj="Agence crée et compte crée";
        }
        else{
            $obj="impossible de creer cet agence";
        }
        return $this->json($obj,200);
    }
}
