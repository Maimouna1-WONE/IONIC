import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../models/transaction';
import {IonInfiniteScroll} from '@ionic/angular';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  public segment = 'list'; page: string; role: string;
  commissions: Transaction[]; total = 0; id: number;
  tot: string;
  data: any[] = Array(20);
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private route: Router,
              private storage: Storage,
              private transactionService: TransactionService,
              private utilservice: UtilsService)
  {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        this.id = JSON.parse(val).compte;
        this.transactionService.getALl(this.id).subscribe(
          res => {
            this.commissions = res;
            for (const m of this.commissions){
              this.total = this.total + m.montant;
              this.tot = this.utilservice.formatMillier(this.total, '.');
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
  }
  loadData(event) {
    setTimeout(() => {
      console.log('ok');
      /*if (this.data.length > 4){
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }*/
      /*const num = Array(5);
      this.data.push(...num);*/
      event.target.complete();
    }, 1000);
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}

