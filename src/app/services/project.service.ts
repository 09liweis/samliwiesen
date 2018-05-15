import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'});
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private api = 'https://samliweisen.herokuapp.com/api/projects/';
  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(this.api);
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
