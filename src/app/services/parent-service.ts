import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from './../models/parent';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private apiUrl = environment.apiUrl+'/schooladmin/parents';

  constructor(private http: HttpClient) {}

  createParent(parent: Parent): Observable<any> {
    return this.http.post(this.apiUrl, parent);
  }
 /* searchParent(parent: Parent): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, parent);
  } */
  searchParents(parent: Parent, page: number, size: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/search?page=${page}&size=${size}`, { ...parent });
  }
}