import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { Experience } from '../models/experience';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private api = 'https://samliweisen.herokuapp.com/api/experiences';
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(this.api);
  }
}
