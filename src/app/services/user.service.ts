import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'user';
  constructor(private http: HttpClient) { }
  
  login(user): Observable<any> {
    return this.http.post(genAPI(this.endpoint + '/login'), user, httpOptions);
  }

  detail(): Observable<any> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return null;
    }
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json').set('auth-token',token);
    const httpOptions = {
      headers
    }
    return this.http.post(genAPI(this.endpoint + '/detail'),{}, httpOptions);
  }
}
