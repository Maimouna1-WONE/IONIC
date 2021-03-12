import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {IonContent, IonInfiniteScroll, IonList} from "@ionic/angular";

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  public segment = 'list'; page: string; role: string; aa = [];
  commissions: Transaction[]; total = 0; lenght: number; id: number;
  constructor(private route: Router,
              private storage: Storage,
              private transactionService: TransactionService)
  {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        this.id = JSON.parse(val).compte;
        this.transactionService.getALl(this.id).subscribe(
          res => {
            // console.log(res);
            this.commissions = res;
            for (const m of this.commissions){
              this.total = this.total + m.montant;
              this.lenght = this.total.toString().length;
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
    this.page = this.route.url.substr(1);
    for (let val = 0; val < 100; val ++){
      this.aa.push(`element _ ${val}`);
    }
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}

