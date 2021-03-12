import { Component, OnInit } from '@angular/core';
import {Client} from '../models/client';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TransactionService} from '../services/transaction.service';

@Component({
  selector: 'app-bloquertransaction',
  templateUrl: './bloquertransaction.page.html',
  styleUrls: ['./bloquertransaction.page.scss'],
})
export class BloquertransactionPage implements OnInit {

  public segment = 'list'; page: string;
  info: string; code: number; depot: Client; retrait: Client;
  myToast: any; cni: string; result: any;
  constructor(private route: Router,
              private alertController: AlertController,
              private transactionservice: TransactionService) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
  }
  getTransaction(){
    if (this.code.toString() !== null && this.cni !== ''){
      this.transactionservice.getByCode(this.code.toString()).subscribe(
        res => {
          this.info = res[0].client_depot.cni;
          if (this.info === this.cni){
            this.transactionservice.deleteTransaction(this.code.toString(), {cni: this.cni}).subscribe(
              res1 => {
                this.result = res1;
                this.alertController.create({
                  header: 'Erreur lors de l\'annulation! ',
                  mode: 'ios',
                  // tslint:disable-next-line:max-line-length
                  message: '' + this.result,
                }).then(res2 => {
                  res2.present();
                });
              },
              error => {
                this.alertController.create({
                  header: 'Erreur lors de l\'annulation! ',
                  mode: 'ios',
                  // tslint:disable-next-line:max-line-length
                  message: '' + error,
                }).then(res3 => {
                  res3.present();
                });
              }
            );
          }
          else {
            this.alertController.create({
              header: 'Erreur N° CNI',
              mode: 'ios',
              // tslint:disable-next-line:max-line-length
              message: 'Veuillez revoir le CNI',
            }).then(res4 => {
              res4.present();
            });
          }
        },
        error => {
          this.alertController.create({
            header: 'Erreur recuperation code! ',
            mode: 'ios',
            // tslint:disable-next-line:max-line-length
            message: '' + error,
          }).then(res2 => {
            res2.present();
          });
        }
      );
    }
  }

}
