<?php

namespace App\DataPersister;

use App\Entity\Compte;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 *
 */
class CompteDataPersister implements ContextAwareDataPersisterInterface
{
    private $_entityManager;private $validator;private $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,ValidatorInterface $validator,SerializerInterface $serializer
    ) {
        $this->_entityManager = $entityManager;$this->validator=$validator;$this->serializer=$serializer;
    }

    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Compte;
    }

    /**
     * @param Compte $data
     */
    public function persist($data, array $context = [])
    {
        $data->setCreatedAt(new \DateTime);
        $data->setNumero(random_int(100,300).'-'.random_int(400,700).'-'.random_int(800,999));
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        $data->setStatut(1);
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }
}