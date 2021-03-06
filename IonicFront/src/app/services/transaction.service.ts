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
    return this.http.post('/api/clients/depotclient', data);
  }
  RetraitClient(data: Object): Observable<Transaction>
  {
    // @ts-ignore
    return this.http.post('/api/clients/retraitclient', data);
  }
  getByCode(data: string): Observable<Transaction>
  {
    // @ts-ignore
    return this.http.get<Transaction>(`/api/transactions/${data}`);
  }
  getALl(): Observable<Transaction[]>
  {
    // @ts-ignore
    return this.http.get<Transaction[]>(`/api/transactions`);
  }
  getMesTransactions(): Observable<Transaction[]>
  {
    // @ts-ignore
    return this.http.get<Transaction[]>(`/api/transaction/me`);
  }
}
