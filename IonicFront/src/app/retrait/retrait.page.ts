import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../models/transaction';
import {Client} from '../models/client';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  public segment = 'list'; page: string;
  addForm: FormGroup; submitted: boolean;
  info: Transaction; code: number; depot: Client; retrait: Client;
  myToast: any;
  constructor(private route: Router,
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private transactionservice: TransactionService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    this.addForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}')]],
      destinataire: new FormGroup({
        cni: new FormControl('', [Validators.required, Validators.pattern('^[1|2][0-9]{12}$')])
      })
    });
  }
  get f()
  {
    return this.addForm.controls;
  }
  getTransaction(){
    if (this.addForm.get('code').errors === null){
      this.transactionservice.getByCode(this.code.toString()).subscribe(
        res => {
          this.info = res[0];
          this.depot = res[0].client_depot;
          this.retrait = res[0].client_retrait;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.addForm.valid){
      this.alertController.create({
        header: 'Confirmation',
        cssClass: 'ion-alert',
        message: '<ion-list>' +
          '<ion-item>' +
          '<ion-label>BENEFICIAIRE: ' + this.retrait.nom + '' + this.retrait.prenom + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          '<ion-label>TELEPHONE: ' + this.retrait.telephone + '</ion-label>' +
          '</ion-item>' +
          '</ion-list>',
        buttons: [
          {
            text: 'Annuler',
            cssClass: 'annuler'
          },
          {
            text: 'Confirmer',
            cssClass: 'success-button',
            handler: () => {
              this.transactionservice.RetraitClient(this.addForm.value).subscribe(
                res => {
                  console.log(res);
                  this.alertController.create({
                    message: '' + res
                  }).then(result11 => {
                    result11.present();
                  });
                },
                error => {
                  console.log(error);
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
