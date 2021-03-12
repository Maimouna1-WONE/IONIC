import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {FraisService} from '../services/frais.service';
import {UtilsService} from '../services/utils.service';
@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.page.html',
  styleUrls: ['./calculatrice.page.scss'],
})
export class CalculatricePage implements OnInit {
  constructor(private route: Router,
              private alertController: AlertController,
              private toastController: ToastController,
              private fraisService: FraisService,
              private utilservice: UtilsService) { }
// tslint:disable-next-line:variable-name
page: string; frais_t: number; private myToast: any;
  frais: number; montant: number; type: string;
  ngOnInit() {
    this.page = this.route.url.substr(1);
  }
  showToast() {
    this.myToast = this.toastController.create({
      // tslint:disable-next-line:max-line-length
      message: 'Pour une transaction ' + this.type + ' de ' + this.utilservice.formatMillier(this.montant, '.') + ', le frais est egal à: ' + this.utilservice.formatMillier(this.frais_t, '.') + ' F CFA',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  Calculer() {
    if (this.montant && this.type) {
      this.frais = this.fraisService.calculerFrais(this.montant);
      if (this.type === 'depot') {
        this.frais_t = (10 * this.frais) / 100;
      } else {
        this.frais_t = (20 * this.frais) / 100;
      }
      this.showToast();
    }
  }
}
