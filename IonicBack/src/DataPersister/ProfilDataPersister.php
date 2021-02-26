<?php

namespace App\DataPersister;

use App\Entity\Profil;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 *
 */
class ProfilDataPersister implements ContextAwareDataPersisterInterface
{
    private $_entityManager;private $validator;private $serializer;
    private $request;

    public function __construct(RequestStack $request,
        EntityManagerInterface $entityManager,ValidatorInterface $validator,SerializerInterface $serializer
    ) {
        $this->_entityManager = $entityManager;$this->validator=$validator;$this->serializer=$serializer;
        $this->request=$request;
    }

    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Profil;
    }

    /**
     * @param Profil $data
     */
    public function persist($data, array $context = [])
    {
        //dd($this->request->getCurrentRequest()->getContent());
        //dd($this->serializer->decode($this->request->getCurrentRequest()->getContent(),"json"));
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
        //return new JsonResponse($pr,200,[],true);
    }

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        $data->setStatut(1);
        $users=$data->getUsers();
        foreach ($users as $user){
            $user->setStatut(1);
        }
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }
}