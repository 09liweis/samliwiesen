import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private api = genAPI('projects',true);
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(this.api);
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(this.api + id);
  }
  
  submit(project): Observable<any> {
    if (project._id != '') {
      return this.http.put(this.api + project._id, project, httpOptions);
    } else {
      delete project._id;
      return this.http.post(this.api, project, httpOptions);
    }
  }
}
