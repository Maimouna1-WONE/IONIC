import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConnexionService} from "../connexion/connexion.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string; avatar: string;
  solde: number; hide: boolean; cle = 'eye';
  date: Date;

  constructor(private activatedRoute: ActivatedRoute) {
    if (JSON.parse(String(localStorage.getItem('currentUserInfo')))) {
      this.avatar = JSON.parse(String(localStorage.getItem('currentUserInfo'))).avatar;
      this.date = JSON.parse(String(localStorage.getItem('currentUserInfo'))).date_depot.date;
      // console.log(this.date);
      this.solde = JSON.parse(String(localStorage.getItem('currentUserInfo'))).solde;
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
