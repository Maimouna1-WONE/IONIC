import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {TransactionService} from '../services/transaction.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FraisService} from '../services/frais.service';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  public segment = 'list'; page: string;
  submitted = false; total: number; nom: string;
  frais: number; montant: number; codebi: string;
  addForm: FormGroup;
  constructor(private route: Router,
              private alertController: AlertController,
              private transactionservice: TransactionService,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private fraisService: FraisService,
              private utilservice: UtilsService) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    // @ts-ignore
    this.addForm = this.formBuilder.group({
      expediteur: new FormGroup({
        nom: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]+$')]),
        prenom: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
        telephone: new FormControl('', [Validators.required, Validators.pattern('^7[7|6|8|0|5][0-9]{7}$')]),
        cni: new FormControl('', [Validators.required, Validators.pattern('^[1|2][0-9]{12}$')]),
      }),
      destinataire: new FormGroup({
        nom: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]+$')]),
        prenom: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
        telephone: new FormControl('', [Validators.required, Validators.pattern('^7[7|6|8|0|5][0-9]{7}$')]),
      }),
      montant: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  get f()
  {
    return this.addForm.controls;
  }
  segmentChanged(ev: any) {
    console.log(ev);
    this.segment = ev.detail.value;
  }
  suivant(){
    this.segment = 'card';
    return this.segment;
  }
  calculTotal(){
    return this.fraisService.calculerFrais(this.montant) + this.montant;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.addForm.valid){
      this.alertController.create({
        header: 'Confirmation',
        cssClass: 'ion-alert',
        mode: 'ios',
        // tslint:disable-next-line:max-line-length
        message: '<ion-list>' +
          '<ion-item>' +
          // tslint:disable-next-line:max-line-length
          '<ion-label>EMETTEUR: ' + this.addForm.get('expediteur').get('nom').value + ' ' + this.addForm.get('expediteur').get('prenom').value + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          // tslint:disable-next-line:max-line-length
          '<ion-label>TELEPHONE: ' + this.addForm.get('expediteur').get('telephone').value + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          '<ion-label>N° CNI: ' + this.addForm.get('expediteur').get('cni').value + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          '<ion-label>MONTANT A ENVOYER:'  + this.utilservice.formatMillier(this.addForm.get('montant').value, '.') + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          // tslint:disable-next-line:max-line-length
          '<ion-label>RECEPTEUR: ' + this.addForm.get('destinataire').get('nom').value + ' ' + this.addForm.get('destinataire').get('prenom').value + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          '<ion-label>TELEPHONE: ' + this.addForm.get('destinataire').get('telephone').value + '</ion-label>' +
          '</ion-item>' +
          '</ion-list>',
        buttons: [
          {
            text: 'Annuler',
            cssClass: 'annuler',
          },
          {
            text: 'Confirmer',
            cssClass: 'success-button',
            handler: () => {
              this.transactionservice.DepotClient(this.addForm.value).subscribe(
                res => {
                  console.log(res);
                  this.codebi = res.code;
                  this.alertController.create({
                    header: 'Transfert reussi',
                    cssClass: 'sms',
                    buttons: [
                      {
                        text: '',
                        cssClass: 'share'
                      },
                      {
                        text: '',
                        cssClass: 'sms'
                      }
                    ],
                    message:  '<ion-grid>' +
                      '<ion-row>' +
                      '<ion-col>' +
                      '<ion-label>INFOS</ion-label>' +
                      // tslint:disable-next-line:max-line-length
                      '<ion-input readonly>Vous avez envoyé ' +  this.utilservice.formatMillier(this.addForm.get('montant').value, '.') + ' à ' + this.addForm.get('destinataire').get('nom').value + ' ' + this.addForm.get('destinataire').get('prenom').value + ' le ' + res.date_depot + '</ion-input>' +
                      '</ion-col>' +
                      '</ion-row>' +
                      '<ion-row>' +
                      '<ion-col>' +
                      '<ion-label>CODE DE TRANSACTION</ion-label>' +
                      // tslint:disable-next-line:max-line-length
                      '<ion-input readonly>' + res.code + '</ion-input>' +
                      '</ion-col>' +
                      '</ion-row>' +
                      '</ion-grid>',
                  }).then(result => {
                    result.present();
                  });
                },
                error => {
                  this.alertController.create({
                    header: 'Erreur ! ' + error,
                    message: 'Veuiller reessayer'
                  }).then(result1 => {
                    result1.present();
                  });
                }
              );
            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }
  }
}
