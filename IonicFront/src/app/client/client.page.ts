import { Component, OnInit } from '@angular/core';
import {PageService} from '../services/page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnexionService} from '../connexion/connexion.service';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
page: string; avatar: any; username: string; role: string;
  clientPages = [
    { title: 'Accueil', url: 'client', icon: 'return-up-forward' },
    { title: 'Historique', url: 'retrait', icon: 'return-up-back' },
    { title: 'Mon compte', url: 'transaction', icon: 'wallet' },
    { title: 'Service client', url: 'calculatrice', icon: 'calculator' },
    { title: 'Deconnexion', url: 'logout', icon: 'exit'},
  ];
  constructor(private pageservice: PageService,
              private route: Router,
              private auth: ConnexionService,
              private storage: Storage,
              private userservice: UserService) {
    this.pageservice.page = this.route.url.substr(1);
    this.page = this.pageservice.page;
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        if ((JSON.parse(val)).id){
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
  ngOnInit() {
  }
  deconnexion(){
    this.auth.logout();
  }
}
