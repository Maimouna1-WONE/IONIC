<?php

namespace App\Controller;
use App\Entity\User;
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


class UserController extends AbstractController
{
    private $encoder;
    private $service;
    private $serializer;
    private $validator;
    private $manager;
    private $repo;
    private $user;
    public function __construct(
        TokenStorageInterface $tokenStorage,UserService $service,UserPasswordEncoderInterface $encoder, SerializerInterface $serializer,ValidatorInterface $validator, EntityManagerInterface $manager, UserRepository $repo){
        $this->repo=$repo;
        $this->service=$service;
        $this->encoder=$encoder;
        $this->manager=$manager;
        $this->validator=$validator;
        $this->serializer=$serializer;
        $this->user = ($tokenStorage->getToken())->getUser();
    }
    /**
     * @Route(
     *     path="/api/users",
     *     name="postUser",
     *     methods={"POST"},
     *     defaults={
     *          "__controller"="App\Controller\UserController::postUser",
     *          "__api_resource_class"=User::class,
     *          "__api_collection_operation_name"="postUser"
     *     }
     * )
     */
    public function postUser(Request $request)
    {
        $val = $this->service->addUser($request);
        if ($val instanceof User){
            $status =Response::HTTP_CREATED;
            $text= "ajout reussi";
        }
        else{
            $status =Response::HTTP_BAD_REQUEST;
            $text= "impossible d'ajouter un utilisateur de ce profil";
        }
        return $this->json($text,$status);
    }

    /**
     * @Route(
     *     path="/api/users/{id}",
     *     name="putUser",
     *     methods={"PUT"},
     *     defaults={
     *          "__controller"="App\Controller\UserController::putUser",
     *          "__api_resource_class"=User::class,
     *          "__api_item_operation_name"="putUser"
     *     }
     * )
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function putUser(Request $request, int $id)
    {
        $object = $this->repo->find($id);
        if (($this->user)->getId() === 2 && (($object->getProfil())->getId() !==3)){
            $obj="impossible de modifier cet utilisateur";
        }
        else{
            $data = $this->service->UpdateUser($request, 'avatar');
            foreach ($data as $key=>$value){
                $ok="set".ucfirst($key);
                if ($key === "password"){
                    //dd((string)substr($data[$key],0,-6));
                    $object->$ok($this->encoder->encodePassword($object,(string)substr($data[$key],0,-6)));
                }
                else {
                    $object->$ok($value);
                }
            }
            $errors = $this->validator->validate($object);
            if (count($errors)){
                $errors = $this->serializer->serialize($errors,"json");
                return new JsonResponse($errors,Response::HTTP_BAD_REQUEST,[],true);
            }
            $this->manager->persist($object);
            $this->manager->flush();
            $obj="modification reussi";
        }
        //dd($object);
        return $this->json($obj,201);
    }

    /**
     * @Route(
     *     path="/api/users/caissiers",
     *     name="getCaissiers",
     *     methods={"GET"},
     *     defaults={
     *          "__controller"="App\Controller\UserController::getCaissiers",
     *          "__api_resource_class"=User::class,
     *          "__api_collection_operation_name"="getCaissiers"
     *     }
     * )
     */
    public function getCaissiers(){
        $caissier=$this->repo->getCaissiers();
        return $this->json($caissier,Response::HTTP_OK);
    }

    /**
     * @Route(
     *     path="/api/users/caissiers",
     *     name="deleteCaissiers",
     *     methods={"DELETE"},
     *     defaults={
     *          "__controller"="App\Controller\UserController::deleteCaissiers",
     *          "__api_resource_class"=User::class,
     *          "__api_item_operation_name"="deleteCaissiers"
     *     }
     * )
     */
    public function deleteCaissiers(){
        $caissier=$this->repo->getCaissiers();
        foreach ($caissier as $value){
            $value->setStatut(1);
        }
        return $this->json("reussi",Response::HTTP_OK);
    }
}
