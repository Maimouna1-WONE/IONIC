import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
role: string;
  constructor(private route: Router, private auth: ConnexionService)
  {
    if (JSON.parse(String(localStorage.getItem('currentUserInfo')))) {
      this.role = JSON.parse(String(localStorage.getItem('currentUserInfo'))).roles[0];
    }
  }

  ngOnInit() {
  }

  deconnexion(){
    this.auth.logout();
  }
}
