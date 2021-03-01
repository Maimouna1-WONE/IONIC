<?php

namespace App\Event;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubsciber{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // On recupere l'utlisateur
        $user = $event->getUser();

        // On enrichit le data du token
        $data = $event->getData();

        /*$data['id'] = $user->getId();*/
        $data['date_depot'] =  $user->getAgence()->getCompte()->getDateDepot();
        $data['solde'] =  $user->getAgence()->getCompte()->getSolde();
        $data['statut'] =  $user->getStatut();
        $data['avatar'] =  $user->getAvatar();

        // Revoie des donnees du Token
        $event->setData($data);
    }
}