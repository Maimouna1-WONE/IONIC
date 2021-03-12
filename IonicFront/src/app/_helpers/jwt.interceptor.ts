import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {ConnexionService} from '../connexion/connexion.service';
import { Storage } from '@ionic/storage';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: ConnexionService,
                private storage: Storage) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from( this.storage.get('currentUser')).pipe(
        switchMap(tokenData => {
          if (tokenData){
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(tokenData).token) });
          }
          return next.handle(request);
        }));
  }
}
