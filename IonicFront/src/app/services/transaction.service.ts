import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Transaction} from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{

  constructor(private http: HttpClient) { }
  DepotClient(data: Object): Observable<Transaction>
  {
    // @ts-ignore
    return this.http.post('/api/client/depotclient', data);
  }
}
