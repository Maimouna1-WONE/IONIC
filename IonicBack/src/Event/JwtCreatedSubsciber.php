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

        $data['id'] = $user->getId();
        if (($user->getProfil())->getId() !== 5){
            $data['compte'] = ($user->getAgence())->getCompte()->getId();
        }
        $data['statut'] = $user->getStatut();

        // Revoie des donnees du Token
        $event->setData($data);
    }
}