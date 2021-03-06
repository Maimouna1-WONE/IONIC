import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
role: string;
  constructor(private route: Router,
              private auth: ConnexionService,
              private storage: Storage)
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
  }

  deconnexion(){
    this.auth.logout();
  }
}
