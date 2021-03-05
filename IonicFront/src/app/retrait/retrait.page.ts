import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {Client} from "../models/client";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  public segment = 'list'; page: string;
  addForm: FormGroup; submitted: boolean;
  info: Transaction; code: number; depot: Client; retrait: Client;
  constructor(private route: Router,
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private transactionservice: TransactionService) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      destinataire: new FormGroup({
        cni: new FormControl()
      })
    });
  }
  get f()
  {
    return this.addForm.controls;
  }
  getTransaction(){
    this.transactionservice.getByCode(this.code.toString()).subscribe(
      res => {
        this.info = res[0];
        console.log(this.info.date_depot);
        this.depot = res[0].client_depot;
        this.retrait = res[0].client_retrait;
      },
      error => {
        console.log(error);
      }
    );
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  OnSubmit() {
    this.submitted = true;
    this.alertController.create({
      header: 'Confirmation',
      cssClass: 'my-custom-class',
      // tslint:disable-next-line:max-line-length
      message: 'BENEFICIAIRE: ' + this.retrait.nom + '' + this.retrait.prenom + 'TELEPHONE: ' + this.retrait.telephone + 'N° CNI: ' + this.addForm.get('destinataire').get('cni').value + 'MONTANT: ' + this.info.montant + 'EMETTEUR: ' + this.depot.nom + ' ' + this.depot.prenom + 'TELEPHONE: ' + this.depot.telephone + '',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.transactionservice.RetraitClient(this.addForm.value).subscribe(
              res => {
                console.log(res);
                /*this.alertController.create({
                  header: 'Retrait reussi',
                  // tslint:disable-next-line:max-line-length
                  message: 'Vous venez de faire un retrait de ' + this.info.montant + '',
                  buttons: [
                    {
                      text: 'Retour',
                      handler: () => {
                      }
                    },
                    {
                      text: 'SMS',
                      handler: () => {}
                    }
                  ]
                });*/
              },
              error => {
                console.log(error);
                /*this.alertController.create({
                  header: 'Erreur'
                });*/
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
