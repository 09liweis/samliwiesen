import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Experience } from '../models/experience';
import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private endpoint = 'experiences';
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(genAPI(this.endpoint));
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(genAPI(this.endpoint + '/' + id));
  }
  
  submit(experience: Experience): Observable<any> {
    if (experience._id != '') {
      return this.http.put(genAPI(this.endpoint + '/' + experience._id), experience, httpOptions);
    } else {
      return this.http.post(genAPI(this.endpoint + '/' + experience._id), experience, httpOptions);
    }
  }
}
