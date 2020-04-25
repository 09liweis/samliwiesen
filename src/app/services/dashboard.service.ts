import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = genAPI('dashboard');

  constructor(private http: HttpClient) { }
  
  getHome(): Observable<any> {
    return this.http.get(this.api);
  }
}
