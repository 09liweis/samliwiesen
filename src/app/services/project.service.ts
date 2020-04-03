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
export class ProjectService {
  private endpoint = 'projects';
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(genAPI(this.endpoint));
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(genAPI(this.endpoint+'/'+id));
  }
  
  submit(project): Observable<any> {
    if (project._id != '') {
      return this.http.put(genAPI(this.endpoint + '/' + project._id), project, httpOptions);
    } else {
      delete project._id;
      return this.http.post(genAPI(this.endpoint), project, httpOptions);
    }
  }
}
