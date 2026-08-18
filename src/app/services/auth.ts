import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Authresponse } from '../models/authresponse';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  //private apiUrl = 'http://localhost:8080/api/auth/login';

    private apiUrl = environment.apiUrl +'/auth';
  private authResponseSubject: BehaviorSubject<Authresponse | null>;
    public authResponse: Observable<Authresponse | null>;


  constructor(private http: HttpClient) { 
  //  this.authResponseSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
  const auth = localStorage.getItem('token');

  this.authResponseSubject = new BehaviorSubject<Authresponse | null>(
    auth ? JSON.parse(auth) : null
  );

  this.authResponse = this.authResponseSubject.asObservable();
  }

  isAuthenticated(): boolean {
    // Implementation for checking authentication status
  //  return true;
   return localStorage.getItem('token') !== null;
  }

  login(loginForm: any): Observable<Authresponse> {
      return this.http.post<Authresponse>(this.apiUrl+'/login', loginForm).pipe(
        map((response: Authresponse) => {
          // Store the response in localStorage
          localStorage.setItem('token', JSON.stringify(response));
          this.authResponseSubject.next(response);
          return response;
        })
      );
  }

  logout1(): void {
    // Remove the token from localStorage
    console.log('Logging out, removing token from localStorage');
    localStorage.removeItem('token');
    this.authResponseSubject.next(null);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const response = JSON.parse(token);
      return response.accessToken; // Assuming the token is stored in the 'accessToken' property
    }
    return null;
  }

  getFullName(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
     const response = JSON.parse(token);
    // token is a string (JWT) stored in localStorage
    console.log('Full Name from localStorage:', response.fullName); // Log the token for debugging

    return response.fullName;
  }   

  getRole(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
     const response = JSON.parse(token);
    // token is a string (JWT) stored in localStorage
    console.log('Role from localStorage:', response.role); // Log the token for debugging


    return response.role;
  }

    register(user:any):Observable<any>{

    return this.http.post(
      this.apiUrl+"/register",
      user
    );

  }



}