import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  public segment = 'list'; page: string;
  constructor(private route: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  suivant(){
    this.segment = 'card';
    return this.segment;
  }
  async OnSubmit() {
    const alert = await this.alertController.create({
      header: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the galaxy?',
      buttons: ['Disagree', 'Agree']
    });
    await alert.present();
  }
}
