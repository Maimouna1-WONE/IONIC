import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from "../connexion/connexion.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  public segment = 'list'; page: string; role: string;
  constructor(private route: Router, private auth: ConnexionService)
  {
    if (JSON.parse(String(localStorage.getItem('currentUserInfo')))) {
      this.role = JSON.parse(String(localStorage.getItem('currentUserInfo'))).roles[0];
    }
  }
  ngOnInit() {
    this.page = this.route.url.substr(1);
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
