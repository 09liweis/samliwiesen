import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { Experience } from '../models/experience';
import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private api = genAPI('experiences',false);
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(this.api);
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(this.api + id);
  }
  
  submit(experience: Experience): Observable<any> {
    if (experience._id != '') {
      return this.http.put(this.api + experience._id, experience, httpOptions);
    } else {
      return this.http.post(this.api, experience, httpOptions);
    }
  }
}
