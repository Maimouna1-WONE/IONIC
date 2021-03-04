import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {ConnexionService} from '../connexion/connexion.service';
import { Storage } from '@ionic/storage';
import {AlertController} from '@ionic/angular';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: ConnexionService,
                private storage: Storage,
                private alertCtrl: AlertController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      /*this.storage.get('currentUser').then((res) => {
        const currentUser = JSON.parse(res);
        if (currentUser && currentUser.token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
        }
        request = request.clone({
          setHeaders: {
            accept: `application/json`
          }
        });
      });
      return next.handle(request);
    }
    return request;*/
      return from( this.storage.get('currentUser')).pipe(
        switchMap(tokenData => {
          if (tokenData){
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(tokenData).token) });
          }
          return next.handle(request);
        }));
  }
}
