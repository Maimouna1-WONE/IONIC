<?php

namespace App\Services;

use App\Repository\ProfilRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;

class UserService
{
    private $encoder;
    private $serializer;
    private $validator;
    private $manager;
    private $repo;
    private $repoProfil;
    private $user;
    public function __construct(
        TokenStorageInterface $tokenStorage,EntityManagerInterface $manager,UserPasswordEncoderInterface $encoder,SerializerInterface $serializer,ValidatorInterface $validator,UserRepository $repo,ProfilRepository $repoProfil) {
        $this->manager = $manager;
        $this->encoder= $encoder;
        $this->serializer=$serializer;
        $this->validator=$validator;
        $this->repo=$repo;
        $this->repoProfil=$repoProfil;
        $this->user = ($tokenStorage->getToken())->getUser();
    }
    public function addUser(Request $request)
    {
        $usertab = $request->request->all();
        //dd($user);
        $avatar = $request->files->get("avatar");
        if ($avatar){
            $avatar = fopen($avatar->getRealPath(),"rb");
            //$avatar = $avatar;
        }
        $idProfil = (int)$usertab["profil"];
        unset($usertab["profil"]);
        $profil = $this->repoProfil->find($idProfil);
        //$entity = substr($profil->getLibelle(), 0, 1).strtolower(substr($profil->getLibelle(), 1));

        $user = $this->serializer->denormalize($usertab, User::class);

        $user->setAvatar($avatar);
        if ($usertab['password']){
            $user->setPassword($this->encoder->encodePassword($user,$usertab['password']));
        }
        else{
            $user->setPassword($this->encoder->encodePassword($user,"pass_1234"));
        }
        $user->setProfil($profil);
        $user->setStatut(0);
        //return $user;
        //dd($user);
        $errors = $this->validator->validate($user);
        if (count($errors)){
            return $errors;
        }
        if (($this->user)->getId() === 2 && ($user->getProfil()->getId() !==3)){
                $obj=null;
        }
        else{
            $this->manager->persist($user);
            $this->manager->flush();
            if ($avatar){
                fclose($avatar);
            }
            $obj=$user;
        }
        return $obj;
    }

    /**
     * put image of user
     * @param Request $request
     * @param string|null $fileName
     */
    public function UpdateUser(Request $request,string $fileName = null)
    {
       $raw =$request->getContent();
        $delimiteur = "multipart/form-data; boundary=";
        $boundary= "--" . explode($delimiteur,$request->headers->get("content-type"))[1];
        $elements = str_replace([$boundary,'Content-Disposition: form-data;',"name="],"",$raw);
        $elementsTab = explode("\r\n\r\n",$elements);
        $data =[];
        //dd($elementsTab);
        for ($i=0;isset($elementsTab[$i+1]);$i+=2){
            $key = str_replace(["\r\n",' "','"'],'',$elementsTab[$i]);
            if (strchr($key,$fileName)){
                $stream =fopen('php://memory','r+');
                fwrite($stream,$elementsTab[$i +1]);
                rewind($stream);
                $data[$fileName] = $stream;
            }else{
                $val=$elementsTab[$i+1];
                $data[$key] = $val;
            }
        }
        return $data;
    }

}