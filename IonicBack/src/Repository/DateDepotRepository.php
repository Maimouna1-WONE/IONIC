<?php

namespace App\Repository;

use App\Entity\DateDepot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DateDepot|null find($id, $lockMode = null, $lockVersion = null)
 * @method DateDepot|null findOneBy(array $criteria, array $orderBy = null)
 * @method DateDepot[]    findAll()
 * @method DateDepot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DateDepotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DateDepot::class);
    }

    // /**
    //  * @return DateDepot[] Returns an array of DateDepot objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DateDepot
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
