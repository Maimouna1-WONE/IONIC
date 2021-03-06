import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  public segment = 'list'; page: string; role: string;
  transactions: Transaction[]; total = 0;
  constructor(private route: Router,
              private auth: ConnexionService,
              private storage: Storage,
              private transactionservice: TransactionService)
  {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        if (JSON.parse(val).roles){
          this.role = JSON.parse(val).roles[0];
        }
      });
    }
  }
  ngOnInit() {
    this.page = this.route.url.substr(1);
    this.transactionservice.getMesTransactions().subscribe(
      res => {
        this.transactions = res;
        if (this.transactions !== [])
        {
          for (const m of this.transactions){
            this.total = this.total + m.montant;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
