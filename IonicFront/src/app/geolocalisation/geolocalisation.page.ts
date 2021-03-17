import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, Platform} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.page.html',
  styleUrls: ['./geolocalisation.page.scss'],
})
export class GeolocalisationPage implements OnInit {
  map: GoogleMap;
  constructor( private actionController: ActionSheetController,
               private platform: Platform,
               private alertController: AlertController) {
    if (this.platform.is('cordova')){
      this.loadMap();
    }
  }
  loadMap(){
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCEdXkLwPp89pmPidXnnKz_pLF-B07DcGo',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCEdXkLwPp89pmPidXnnKz_pLF-B07DcGo'
    });
    this.map = GoogleMaps.create('mapCanvas', {
      camera: {
        target: {
          lat: 43.610769,
          lng: 3.876716
        },
        zoom: 12,
        tilt: 30
      }
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionController.create({
      header: 'Action',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Satellite',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        icon: 'share',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        icon: 'heart',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Hybrid',
        icon: 'heart',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.HYBRID);
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async addMarker() {
    const alert = await this.alertController.create({
      header: 'Ajouter un emplacement',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Le titre'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ajouter',
          handler: data => {
            console.log('Titre: ' + data.title);
            this.placeMarker(data.title);
          }
        }
      ]
    });
    await alert.present();
  }
  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
      title: markerTitle,
      icon: 'red',
      animation: 'DROP',
      position: this.map.getCameraPosition().target
    });
    console.log(marker);
  }
  ngOnInit() {
  }

}
