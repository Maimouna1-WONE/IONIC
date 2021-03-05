import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from "../connexion/connexion.service";
import {Storage} from "@ionic/storage";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  public segment = 'list'; page: string; role: string;
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
        console.log(res);
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
