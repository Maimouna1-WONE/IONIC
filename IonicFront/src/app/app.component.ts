import { Component } from '@angular/core';
import {ConnexionService} from "./connexion/connexion.service";
import {log} from "util";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Depot', url: '/folder/Inbox', icon: 'return-up-forward' },
    { title: 'Retrait', url: '/folder/Outbox', icon: 'return-up-back' },
    { title: 'Mes transactions', url: '/folder/Favorites', icon: 'repeat' },
    { title: 'Toutes mes transactions', url: '/folder/Favorites', icon: 'repeat' },
    { title: 'Mes commissions', url: '/folder/Archived', icon: 'list-circle' },
    { title: 'Calculateur de frais', url: '/folder/Trash', icon: 'calculator' },
    { title: 'Deconnexion', url: '', icon: 'exit', click: 'deconnexion()' },
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
