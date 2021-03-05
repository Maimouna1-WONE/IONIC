import { Component } from '@angular/core';
import {ConnexionService} from './connexion/connexion.service';
import { Storage } from '@ionic/storage';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Depot', url: 'depot', icon: 'return-up-forward' },
    { title: 'Retrait', url: 'retrait', icon: 'return-up-back' },
    { title: 'Mes transactions', url: 'transaction', icon: 'wallet' },
    { title: 'Toutes mes transactions', url: 'transaction', icon: 'repeat' },
    { title: 'Mes commissions', url: 'commission', icon: 'cash' },
    { title: 'Calculateur de frais', url: 'calculatrice', icon: 'calculator' },
    { title: 'Deconnexion', url: 'logout', icon: 'exit'},
  ];
  username: string; avatar: any; role: string;
  constructor(private auth: ConnexionService,
              private storage: Storage,
              private userservice: UserService) {
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        if (JSON.parse(val).id){
          this.userservice.getbyId(JSON.parse(val).id).subscribe(
            res => {
              this.avatar = res.avatar;
            },
            error => {
              console.log(error);
            }
          );
        }
        this.username = JSON.parse(val).username;
        this.role = JSON.parse(val).roles[0];
      });
    }
  }
  deconnexion(){
    this.auth.logout();
  }
}
