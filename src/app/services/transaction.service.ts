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
export class TransactionService {
  private endpoint = 'transactions';
  constructor(private http: HttpClient) { }
  
  getList(filters={}): Observable<any> {
    let query = '';
    for (let k in filters) {
      if (filters[k]){
        query += `&${k}=${filters[k]}`;
      }
    }
    return this.http.get(genAPI(this.endpoint+query));
  }
  
  getDetail(id: string): Observable<any> {
    return this.http.get(genAPI(this.endpoint+'/'+id));
  }
  
  submit(transaction): Observable<any> {
    if (transaction._id != '') {
      return this.http.put(genAPI(this.endpoint + '/' + transaction._id), transaction, httpOptions);
    } else {
      delete transaction._id;
      return this.http.post(genAPI(this.endpoint), transaction, httpOptions);
    }
  }
}
