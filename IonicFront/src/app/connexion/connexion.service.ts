import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// @ts-ignore
import { JwtHelperService } from '@auth0/angular-jwt';
// @ts-ignore
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import {User} from '../models/user';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService
{
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  infoUser: User; chaine: any;
  private decode = new JwtHelperService();
  // url = environment.url;

  constructor(private http: HttpClient, private userService: UserService,
              private router: Router,
              private storage: Storage)
  {
    this.storage.get('currentUser').then((res) => {
      this.chaine = JSON.parse(res);
    });
    this.currentUserSubject = new BehaviorSubject<User>(this.chaine);
    //console.log(this.currentUserSubject.value);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  public get currentUserValue(): User
  {
    return this.currentUserSubject.value;
  }
  // tslint:disable-next-line:typedef
  login( email: string, password: string)
  {
    return this.http.post<any>(`/api/login_check`, { email, password })
      .pipe(map(token => {
          const tokenInfo = this.getInfoToken(token['token']);
          // console.log(token);
          if (tokenInfo.statut === false) {
            this.storage.set('currentUser', JSON.stringify(token));
            this.storage.set('currentUserInfo', JSON.stringify(tokenInfo));
            this.currentUserSubject.next(token);
            return tokenInfo.roles[0];
          }
          else {
            console.log('erreur');
          }
        })
      );
  }

  // tslint:disable-next-line:typedef
  logout()
  {
    this.storage.remove('currentUser');
    this.storage.remove('currentUserInfo');
    this.currentUserSubject.next(null);
    this.router.navigate(['/accueil']);
  }

  getInfoToken(token: string): any
  {
    try
    {
      return this.decode.decodeToken(token);
    }
    catch ( Error )
    {
      return null;
    }
  }
}
