import { Component, OnInit } from '@angular/core';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/user.service';
import {PageService} from "../services/page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  role: string; page: string; colour: string;
  constructor(private auth: ConnexionService,
              private storage: Storage,
              private pageservice: PageService,
              private route: Router) {
    this.page = this.route.url.substr(1);
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
/*color(){
    if (this.page === 'folder/Inbox'){
      this.colour = 'oranged';
    }
    return this.colour;
}*/
}
