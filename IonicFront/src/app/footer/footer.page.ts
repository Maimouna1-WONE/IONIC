import { Component, OnInit } from '@angular/core';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  role: string;
  constructor(private auth: ConnexionService,
              private storage: Storage) {
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

}
