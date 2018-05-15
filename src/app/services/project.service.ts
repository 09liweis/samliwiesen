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
}
