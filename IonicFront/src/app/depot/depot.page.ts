import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {TransactionService} from "../services/transaction.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  public segment = 'list'; page: string;
  submitted = false; total: number; nom: string;
  frais: number; montant: number;
  addForm: FormGroup;
  constructor(private route: Router,
              private alertController: AlertController,
              private transactionservice: TransactionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    // @ts-ignore
    this.addForm = this.formBuilder.group({
      expediteur: new FormGroup({
        nom: new FormControl(),
        prenom: new FormControl(),
        telephone: new FormControl(),
        cni: new FormControl(),
      }),
      destinataire: new FormGroup({
        nom: new FormControl(),
        prenom: new FormControl(),
        telephone: new FormControl(),
      }),
      montant: ['', Validators.required],
    });
  }
  get f()
  {
    return this.addForm.controls;
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  suivant(){
    this.segment = 'card';
    return this.segment;
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
  calculTotal(){
    return this.frais + this.montant;
  }
  OnSubmit() {
    this.submitted = true;
    this.alertController.create({
    header: 'Confirmation',
      cssClass: 'my-custom-class',
      // tslint:disable-next-line:max-line-length
    message: 'EMETTEUR: ' + this.addForm.get('expediteur').get('nom').value + '' + this.addForm.get('expediteur').get('prenom').value + 'TELEPHONE: ' + this.addForm.get('expediteur').get('telephone').value + 'N° CNI: ' + this.addForm.get('expediteur').get('cni').value + 'MONTANT A ENVOYER: ' + this.addForm.get('montant').value + 'RECEPETUR: ' + this.addForm.get('destinataire').get('nom').value + ' ' + this.addForm.get('destinataire').get('prenom').value + 'TELEPHONE: ' + this.addForm.get('destinataire').get('telephone').value + '',
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
          this.transactionservice.DepotClient(this.addForm.value).subscribe(
          res => {
            console.log(res);
            this.alertController.create({
              header: 'Transfert reussi',
              // tslint:disable-next-line:max-line-length
              message: 'Vous avez envoyé ' + this.addForm.get('montant').value + ' à' + this.addForm.get('destinataire').get('nom').value + this.addForm.get('destinataire').get('prenom').value + ' le ' + res.date_depot + '\n CODE DE TRANSACTION: ' + res.code ,
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
            });
          },
          error => {
            this.alertController.create({
              header: 'Erreur'
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
