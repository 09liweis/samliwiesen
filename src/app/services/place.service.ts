import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private http: HttpClient) { }
  
  getList(name): Observable<any> {
    let api = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=nofills&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos';
    return this.http.get(api);
  }
}
