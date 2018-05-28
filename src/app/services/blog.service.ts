import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Blog } from '../models/blog';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private api = 'https://samliweisen.herokuapp.com/api/blogs/';

  constructor(private http: HttpClient) { }
  
  getList(): Observable<any> {
    return this.http.get(this.api);
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(this.api + id);
  }
  
  submit(blog: Blog): Observable<any> {
    if (blog._id != '') {
      return this.http.put(this.api + blog._id, blog, httpOptions);
    } else {
      delete blog._id;
      return this.http.post(this.api, blog, httpOptions);
    }
  }
}
