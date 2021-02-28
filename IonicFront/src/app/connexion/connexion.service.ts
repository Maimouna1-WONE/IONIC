import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// @ts-ignore
import { JwtHelperService } from '@auth0/angular-jwt';
// @ts-ignore
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService
{
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  infoUser: User;
  private decode = new JwtHelperService();

  constructor(private http: HttpClient, private userService: UserService,
              private router: Router)
  {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  public get currentUserValue(): User
  {
    return this.currentUserSubject.value;
  }
  // tslint:disable-next-line:typedef
  login( username: string, password: string)
  {
    return this.http.post<any>(`/api/login_check`, { 'email' : username, 'password' : password })
      .pipe(map(token => {
          const tokenInfo = this.getInfoToken(token['token']);
          console.log(tokenInfo);
          if (tokenInfo.statut === false) {
            localStorage.setItem('currentUser', JSON.stringify(token));
            localStorage.setItem('currentUserInfo', JSON.stringify(tokenInfo));
            /*const en = window.atob(password);
            console.log(en);*/
            // localStorage.setItem('password', JSON.stringify(password));
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
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserInfo');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login_check']);
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
  /*getbyLogin(): Observable<User>
  {
    return this.http.get<User>(`/api/admin/users/search`);
  }*/
}
