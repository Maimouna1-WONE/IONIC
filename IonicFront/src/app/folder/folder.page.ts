import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import {UserService} from '../services/user.service';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string; avatar: string;
  solde: string; hide: boolean; cle = 'eye';
  date: Date; length = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private userservice: UserService,
              private storage: Storage,
              private util: UtilsService) {
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
        this.date = JSON.parse(val).date_depot.date;
        this.solde = this.util.formatMillier(JSON.parse(val).solde, '.');
      });
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
  ngOnInit() {}
}
