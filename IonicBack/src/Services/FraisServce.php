<?php

namespace App\Services;

use App\Entity\Transaction;

class FraisServce
{
    public function __construct() {}
    public function generateFrais(int $mtn)
    {
        $trans= new Transaction();
        if ($mtn >= 0 && $mtn <= 5000){
            $frais= 425;
        }
        if ($mtn >= 5000 && $mtn <= 10000){
            $frais= 850;
        }
        if ($mtn >= 10000 && $mtn <= 15000){
            $frais= 1270;
        }
        if ($mtn >= 15000 && $mtn <= 20000){
            $frais= 1695;
        }
        if ($mtn >= 20000 && $mtn <= 50000){
            $frais= 2500;
        }
        if ($mtn >= 50000 && $mtn <= 60000){
            $frais= 3000;
        }
        if ($mtn >= 60000 && $mtn <= 75000){
            $frais= 4000;
        }
        if ($mtn >= 75000 && $mtn <= 120000){
            $frais= 5000;
        }
        if ($mtn >= 120000 && $mtn <= 150000){
            $frais= 6000;
        }
        if ($mtn >= 150000 && $mtn <= 200000){
            $frais= 7000;
        }
        if ($mtn >= 200000 && $mtn <= 250000){
            $frais= 8000;
        }
        if ($mtn >= 250000 && $mtn <= 300000){
            $frais= 9000;
        }
        if ($mtn >= 300000 && $mtn <= 400000){
            $frais= 12000;
        }
        if ($mtn >= 400000 && $mtn <= 750000){
            $frais= 15000;
        }
        if ($mtn >= 750000 && $mtn <= 900000){
            $frais= 15000;
        }
        if ($mtn >= 900000 && $mtn <= 1000000){
            $frais= 22000;
        }
        if ($mtn >= 1000000 && $mtn <= 1125000){
            $frais= 25000;
        }
        if ($mtn >= 1125000 && $mtn <= 1400000){
            $frais= 27000;
        }
        if ($mtn >= 14000000 && $mtn <= 2000000){
            $frais= 30000;
        }
        if ($mtn >= 2000000 && $mtn <= 250000){
            $frais= (2*$mtn)/100;
        }
        $fe=(40*$frais)/100;
        $fd=(30*$frais)/100;
        $fa=(10*$frais)/100;
        $fu=(20*$frais)/100;
        $trans->setFrais($frais);
        $trans->setFraisDepot($fd);
        $trans->setFraisEtat($fe);
        $trans->setFraisRetrait($fu);
        $trans->setFraisSysteme($fa);
        return $trans;
    }
}