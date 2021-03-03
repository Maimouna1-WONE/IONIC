import { Component } from '@angular/core';
import {ConnexionService} from './connexion/connexion.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Depot', url: 'depot', icon: 'return-up-forward' },
    { title: 'Retrait', url: 'retrait', icon: 'return-up-back' },
    { title: 'Mes transactions', url: 'transaction', icon: 'repeat' },
    { title: 'Toutes mes transactions', url: 'transaction', icon: 'repeat' },
    { title: 'Mes commissions', url: 'commission', icon: 'list-circle' },
    { title: 'Calculateur de frais', url: 'calculatrice', icon: 'calculator' },
    { title: 'Deconnexion', url: 'logout', icon: 'exit'},
  ];
  username: string; avatar: string;
  constructor(private auth: ConnexionService) {
    if (localStorage.getItem('currentUserInfo')){
      this.username = JSON.parse(String(localStorage.getItem('currentUserInfo'))).username;
      this.avatar = JSON.parse(String(localStorage.getItem('currentUserInfo'))).avatar;
    }
  }
  deconnexion(){
    this.auth.logout();
  }
}
