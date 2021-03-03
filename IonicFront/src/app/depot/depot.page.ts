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
  frais: number;
  addForm: FormGroup;
  constructor(private route: Router,
              private alertController: AlertController,
              private transactionservice: TransactionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    // @ts-ignore
    this.addForm = this.formBuilder.group({
      client_depot: new FormGroup({
        nomd: new FormControl(),
        prenomd: new FormControl(),
        telephone: new FormControl(),
        cni: new FormControl(),
      }),
      client_retrait: new FormGroup({
        nomr: new FormControl(),
        prenomr: new FormControl(),
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
  async OnSubmit() {
    console.log(this.addForm.value);
    /*this.transactionservice.DepotClient(this.addForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );*/
    /*const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'sfdghjhkjlkjhghfgdfgfhgjh',
      buttons: ['Annuler', 'Confirmer']
    });
    await alert.present();*/
  }
}
