import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Blog } from '../models/blog';
import {genAPI} from '../constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private endpoint = 'blogs';

  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(genAPI(this.endpoint));
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(genAPI(this.endpoint + '/' + id));
  }
  
  submit(blog: Blog): Observable<any> {
    if (blog._id != '') {
      return this.http.put(genAPI(this.endpoint + '/' + blog._id), blog, httpOptions);
    } else {
      delete blog._id;
      return this.http.post(genAPI(this.endpoint), blog, httpOptions);
    }
  }
  delete(id: string): Observable<any> {
    return this.http.delete(genAPI(this.endpoint) + id, httpOptions);
  }
}
