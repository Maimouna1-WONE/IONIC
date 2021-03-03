import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

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
