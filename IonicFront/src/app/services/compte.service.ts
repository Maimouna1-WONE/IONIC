import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Compte} from '../models/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService{

  constructor(private http: HttpClient) { }
  getCompte(id: number): Observable<Compte>
  {
    // @ts-ignore
    return this.http.get<Compte>(`/api/comptes/${id}`);
  }
}
