import { Component, OnInit } from '@angular/core';
import {PageService} from "../services/page.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  public segment = 'list'; page: string; icon: string;
  role: string;
  constructor(private pageservice: PageService,
              private route: Router,
              private storage: Storage) {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        if (JSON.parse(val).roles){
          this.role = JSON.parse(val).roles[0];
          console.log(this.role);
        }
      });
    }
  }

  ngOnInit() {
    this.pageservice.page = this.route.url.substr(1);
    this.page = this.pageservice.page;
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
    return this.icon;
  }
}
