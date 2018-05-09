import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {
    

    constructor(private http: HttpClient) {
    }
    
    getList(): Observable<any> {
        return this.http.get('https://editorial.rottentomatoes.com/wp-json/articles/');
    }
    
}
