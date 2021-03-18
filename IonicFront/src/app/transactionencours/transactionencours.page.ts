import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {Storage} from "@ionic/storage";
import {Transaction} from "../models/transaction";
import {UtilsService} from "../services/utils.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-transactionencours',
  templateUrl: './transactionencours.page.html',
  styleUrls: ['./transactionencours.page.scss'],
})
export class TransactionencoursPage implements OnInit {
  public segment = 'list'; page: string; role: string; alltotal = 0;
  id: number; alltransaction: Transaction[]; alltot: string;
  constructor(private transactionservie: TransactionService,
              private storage: Storage,
              private utilservice: UtilsService,
              private alertController: AlertController) {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        // console.log(JSON.parse(val));
        this.id = JSON.parse(val).compte;
        this.transactionservie.getencours(this.id).subscribe(
          res => {
            this.alltransaction = res;
            if (this.alltransaction !== [])
            {
              for (const am of this.alltransaction){
                this.alltotal = this.alltotal + am.montant;
                this.alltot = this.utilservice.formatMillier(this.alltotal, '.');
              }
            }
          },
          error => {
            this.alertController.create({
              header: 'Erreur Service! ' + error,
              message: 'Veuiller reessayer'
            }).then(result1 => {
              result1.present();
            });
          }
        );
      });
    }
  }

  ngOnInit() {
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
