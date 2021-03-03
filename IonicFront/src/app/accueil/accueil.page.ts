import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(public loadingController: LoadingController,
              private route: Router, private navController: NavController) {
    this.presentLoading();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    await this.route.navigate(['login_check']);
    await loading.dismiss();
  }

  ngOnInit(): void {
  }
}
