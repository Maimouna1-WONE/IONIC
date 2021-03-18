import { Component, OnInit } from '@angular/core';
import {PageService} from '../services/page.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Transaction} from '../models/transaction';
import {TransactionService} from '../services/transaction.service';
import {UtilsService} from '../services/utils.service';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  public segment = 'friends'; page: string; icon: string;
  seg: string; id: number;
  role: string; alltransaction: Transaction[];
  transactions: Transaction[]; total = 0; alltotal = 0;
  tot: string; alltot: string;
  constructor(private pageservice: PageService,
              private route: Router,
              private storage: Storage,
              private transactionservice: TransactionService,
              private utilservice: UtilsService,
              private alertController: AlertController) {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        // console.log(JSON.parse(val));
        this.id = JSON.parse(val).compte;
        this.transactionservice.getALl(this.id).subscribe(
          res => {
            // console.log(res);
            this.alltransaction = res;
            // console.log(this.alltransaction);
            if (this.alltransaction !== [])
            {
              for (const am of this.alltransaction){
                this.alltotal = this.alltotal + am.montant;
                this.alltot = this.utilservice.formatMillier(this.alltotal, '.');
              }
            }
          },
          error => {
            console.log(error);
          }
        );
        if (JSON.parse(val).roles){
          this.role = JSON.parse(val).roles[0];
        }
      });
    }
  }

  ngOnInit() {
    this.pageservice.page = this.route.url.substr(1);
    this.page = this.pageservice.page;
    this.transactionservice.getMesTransactions().subscribe(
      res => {
        this.transactions = res;
        if (this.transactions !== [])
        {
          for (const m of this.transactions){
            this.total = this.total + m.montant;
            this.tot = this.utilservice.formatMillier(this.total, '.');
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
  }
  GiveIcon(t: string){
    if (t === 'commission'){
      this.icon = 'cash-outline';
    }
    if (t === 'depot'){
    this.icon = 'return-up-forward';
  }
    if (t === 'retrait'){
    this.icon = 'return-up-back';
  }
    if (t === 'transaction'){
    this.icon = 'wallet-outline';
  }
    if (t === 'calculatrice'){
    this.icon = 'calculator';
  }
    if (t === 'bloquertransaction'){
      this.icon = 'close';
    }
    if (t === 'transactionencours'){
      this.icon = 'timer-outline';
    }
    if (t === 'geolocalisation'){
      this.icon = 'telescope-outline';
    }
    return this.icon;
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  segChanged(ev1: any) {
    this.seg = ev1.detail.value;
    console.log(this.seg);
  }
}
