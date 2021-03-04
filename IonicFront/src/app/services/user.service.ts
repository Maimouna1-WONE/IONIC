import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
  getAll(num: number): Observable<User[]>
  {
    // @ts-ignore
    return this.http.get<User[]>(`/api/admin/users?archive=false&page=${num + 1}`);
  }
  getAllUsers(): Observable<User[]>
  {
    // @ts-ignore
    return this.http.get<User[]>(`/api/admin/users`);
  }
  getbyId(id: number): Observable<User>
  {
    return this.http.get<User>(`/api/users/${id}`);
  }
  getQrcode(id: number): Observable<User>
  {
    return this.http.get<User>(`/api/admin/users/${id}/qrcode`);
  }
  // tslint:disable-next-line:typedef
  deleteOneUser(id: number)
  {
    return this.http.delete(`/api/admin/users/${id}`);
  }
  addUser(data: FormData): Observable<User>
  {
    // @ts-ignore
    return this.http.post('/api/admin/users', data);
  }
  // tslint:disable-next-line:typedef
  updateOneUser(id: number, data: FormData)
  {
    // @ts-ignore
    return this.http.put(`/api/admin/users/${id}`, data);
  }
}
