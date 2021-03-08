import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, ToastController} from "@ionic/angular";
import {TransactionService} from "../services/transaction.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FraisService} from "../services/frais.service";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  public segment = 'list'; page: string;
  submitted = false; total: number; nom: string;
  frais: number; montant: number; myToast: any;
  addForm: FormGroup;
  constructor(private route: Router,
              private alertController: AlertController,
              private transactionservice: TransactionService,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private fraisService: FraisService) { }

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
      console.log(this.addForm);
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
                  this.myToast = this.toastController.create({
                    // tslint:disable-next-line:max-line-length
                    message: 'Vous avez envoyé ' + this.addForm.get('montant').value + ' à' + this.addForm.get('destinataire').get('nom').value + this.addForm.get('destinataire').get('prenom').value + ' le ' + res.date_depot + '\n CODE DE TRANSACTION: ' + res.code,
                    duration: 10000
                  }).then((toastData) => {
                    // console.log(toastData);
                    toastData.present();
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
}
