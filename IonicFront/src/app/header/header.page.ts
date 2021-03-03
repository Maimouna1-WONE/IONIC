import { Component, OnInit } from '@angular/core';
import {PageService} from "../services/page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  public segment = 'list'; page: string; icon: string;
  role: string;
  constructor(private pageservice: PageService, private route: Router) {
    if (JSON.parse(String(localStorage.getItem('currentUserInfo')))) {
      this.role = JSON.parse(String(localStorage.getItem('currentUserInfo'))).roles[0];
    }
  }

  ngOnInit() {
    this.pageservice.page = this.route.url.substr(1);
    this.page = this.pageservice.page;
  }
GiveIcon(t: string){
    if (t === 'commission'){
      this.icon = 'list-circle';
    }
    if (t === 'depot'){
    this.icon = 'return-up-forward';
  }
    if (t === 'retrait'){
    this.icon = 'return-up-back';
  }
    if (t === 'transaction'){
    this.icon = 'repeat';
  }
    if (t === 'calculatrice'){
    this.icon = 'calculator';
  }
    return this.icon;
}
}
