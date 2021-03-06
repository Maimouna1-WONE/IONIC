import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.page.html',
  styleUrls: ['./calculatrice.page.scss'],
})
export class CalculatricePage implements OnInit {
  constructor(private route: Router,
              private alertController: AlertController) { }
// tslint:disable-next-line:variable-name
page: string; frais_t: number;
  frais: number; montant: number; type: string;
  ngOnInit() {
    this.page = this.route.url.substr(1);
  }
  calculerFrais(){
    if (this.montant >= 0 && this.montant <= 5000){
      this.frais = 425;
    }
    if (this.montant >= 5000 && this.montant <= 10000){
      this.frais = 850;
    }
    if (this.montant >= 10000 && this.montant <= 15000){
      this.frais = 1270;
    }
    if (this.montant >= 15000 && this.montant <= 20000){
      this.frais = 1695;
    }
    if (this.montant >= 20000 && this.montant <= 50000){
      this.frais = 2500;
    }
    if (this.montant >= 50000 && this.montant <= 60000){
      this.frais = 3000;
    }
    if (this.montant >= 60000 && this.montant <= 75000){
      this.frais = 4000;
    }
    if (this.montant >= 75000 && this.montant <= 120000){
      this.frais = 5000;
    }
    if (this.montant >= 120000 && this.montant <= 150000){
      this.frais = 6000;
    }
    if (this.montant >= 150000 && this.montant <= 200000){
      this.frais = 7000;
    }
    if (this.montant >= 200000 && this.montant <= 250000){
      this.frais = 8000;
    }
    if (this.montant >= 250000 && this.montant <= 300000){
      this.frais = 9000;
    }
    if (this.montant >= 300000 && this.montant <= 400000){
      this.frais = 12000;
    }
    if (this.montant >= 400000 && this.montant <= 750000){
      this.frais = 15000;
    }
    if (this.montant >= 750000 && this.montant <= 900000){
      this.frais = 15000;
    }
    if (this.montant >= 900000 && this.montant <= 1000000){
      this.frais = 22000;
    }
    if (this.montant >= 1000000 && this.montant <= 1125000){
      this.frais = 25000;
    }
    if (this.montant >= 1125000 && this.montant <= 1400000){
      this.frais = 27000;
    }
    if (this.montant >= 14000000 && this.montant <= 2000000){
      this.frais = 30000;
    }
    if (this.montant >= 2000000 && this.montant <= 250000){
      this.frais = (2 * this.montant) / 100;
    }
    return this.frais;
  }
  Calculer(){
    this.frais = this.calculerFrais();
    if (this.type === 'depot'){
      this.frais_t = (10 * this.frais) / 100;
    }
    else{
      this.frais_t = (20 * this.frais) / 100;
    }
    this.alertController.create({
      header: 'Calculateur',
      cssClass: 'my-custom-class',
      // tslint:disable-next-line:max-line-length
      message: 'Pour une transaction ' + this.type + ' de ' + this.montant + ', le frais est egal à: ' + this.frais_t + ' F CFA',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('I care about humanity');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
