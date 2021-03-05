import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

  public segment = 'list'; page: string; role: string;
  commissions: Transaction[]; total = 0;
  constructor(private route: Router,
              private storage: Storage,
              private transactionService: TransactionService)
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
    this.transactionService.getALl().subscribe(
      res => {
        this.commissions = res['hydra:member'];
        for (const m of this.commissions){
          this.total = this.total + m.montant;
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
