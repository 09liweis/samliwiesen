import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {genAPI,buildHttpOptions,getAuthToken} from '../constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'user';
  constructor(private http: HttpClient) { }
  
  login(user): Observable<any> {
    var httpOptions = buildHttpOptions();
    return this.http.post(genAPI(this.endpoint + '/login'), user, httpOptions);
  }

  getList(): Observable<any> {
    if (!getAuthToken()) {
      return null;
    }
    var httpOptions = buildHttpOptions();
    return this.http.post(genAPI(this.endpoint + '/list'), {}, httpOptions);
  }

  detail(): Observable<any> {
    if (!getAuthToken()) {
      return null;
    }
    var httpOptions = buildHttpOptions();
    return this.http.post(genAPI(this.endpoint + '/detail'),{}, httpOptions);
  }
}
