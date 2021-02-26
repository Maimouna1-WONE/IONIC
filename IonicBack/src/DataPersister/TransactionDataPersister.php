<?php

namespace App\DataPersister;

use App\Entity\Compte;
use App\Entity\Transaction;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 *
 */
class TransactionDataPersister implements ContextAwareDataPersisterInterface
{
    private $_entityManager;private $validator;private $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,SerializerInterface $serializer
    ) {
        $this->_entityManager = $entityManager;$this->validator=$validator;$this->serializer=$serializer;
    }

    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Transaction;
    }

    /**
     * @param Transaction $data
     */
    public function persist($data, array $context = [])
    {
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        if ($data->getDateRetrait() === null){
            $data->setStatut(1);
        }
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }
}