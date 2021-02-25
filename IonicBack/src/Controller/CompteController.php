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
     *     path="/api/comptes/{id}",
     *     name="updateCompte",
     *     methods={"PUT"},
     *     defaults={
     *          "__controller"="App\Controller\CompteController::updateCompte",
     *          "__api_resource_class"=Compte::class,
     *          "__api_collection_operation_name"="updateCompte"
     *     }
     * )
     * @param Request $request
     */
    public function updateCompte(Request $request, int $id){
        if (($this->user->getProfil())->getId() === 3) {
            //dd('ok');
            $cmpt = json_decode($request->getContent(), true);
            //dd($cmpt);
            $object=$this->repoC->find($id);
            if ($cmpt !== []){
                $object->setSolde($object->getSolde() + $cmpt['solde']);
                $object->setDateDepot(new \DateTime());
            }
            $object->setUser($this->user);
            $errors = $this->validator->validate($object);
            if (count($errors)) {
                $errors = $this->serializer->serialize($errors, "json");
                return new JsonResponse($errors, Response::HTTP_BAD_REQUEST, [], true);
            }
            $this->manager->persist($object);
            $this->manager->flush();
            $obj="Compte modifié";
        }
        else{
            $obj="impossible de modifier cette compte";
        }
        return $this->json($obj,200);
    }
}
