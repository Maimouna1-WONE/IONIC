<?php

namespace App\Repository;

use App\Entity\Transaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Transaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaction[]    findAll()
 * @method Transaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transaction::class);
    }

    // /**
    //  * @return Transaction[] Returns an array of Transaction objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transaction
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function findTransaction(string $value)
    {
        return $this->createQueryBuilder('t')
            ->select('t')
            ->andWhere('t.code = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }
    public function findMesTransaction(int $value)
    {
        return $this->createQueryBuilder('t')
            ->select('t')
            // ->andWhere('t.user_depot = t.user_retrait')
            ->andWhere('t.user_depot = :val')
            ->orWhere('t.user_retrait = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }
    public function findttTransaction(int $value)
    {
        return $this->createQueryBuilder('t')
            ->select('t')
            // ->andWhere('t.user_depot = t.user_retrait')
            ->andWhere('t.compte = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }
    public function findTransactionencours(int $value)
    {
        return $this->createQueryBuilder('t')
            ->select('t')
            ->andWhere("t.type = 'depot'")
            ->andWhere('t.compte = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }
}
