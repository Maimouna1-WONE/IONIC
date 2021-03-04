import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConnexionService} from "../connexion/connexion.service";
import { Storage } from '@ionic/storage';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string; avatar: string;
  solde: number; hide: boolean; cle = 'eye';
  date: Date;

  constructor(private activatedRoute: ActivatedRoute,
              private userservice: UserService,
              private storage: Storage) {
    // console.log(this.storage.get('currentUserInfo'));
    if ((this.storage.get('currentUserInfo'))) {
      this.storage.get('currentUserInfo').then((val) => {
        this.userservice.getbyId(JSON.parse(val).id).subscribe(
          res => {
            this.avatar = res.avatar;
          },
          error => {
            console.log(error);
          }
        );
        this.date = JSON.parse(val).date_depot.date;
        this.solde = JSON.parse(val).solde;
      });
      // this.avatar = JSON.parse(String(this.storage.get('currentUserInfo'))).avatar;
      // this.date = JSON.parse(String(this.storage.get('currentUserInfo'))).date_depot.date;
      // console.log(this.date);
      // this.solde = JSON.parse(String(this.storage.get('currentUserInfo'))).solde;
    }
  }
  isActiveToggleTextPassword = true;
  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword !== true);
    if (this.isActiveToggleTextPassword) {
      this.cle = 'eye';
    }
    else{
      this.cle = 'eye-off';
    }
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'text' : 'password';
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
