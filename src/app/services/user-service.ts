import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  
  //private apiUrl = 'http://localhost:8080/api/admin/user';

    private apiUrl = environment.apiUrl +'/admin/user';
  

  constructor(private http: HttpClient) { }

  createUser(user: any) {
  return this.http.post(
    `${this.apiUrl}`,
    user
  );
}

getUsers(
    page: number,
    size: number,
    search: string
  ) {

    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}&search=${search}`
    );
  }

  getUserById(id: number) {
  return this.http.get<any>(
    `${this.apiUrl}/${id}`
  );
}

updateUser(id: number, user: any) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    user
  );  

}

deleteUser(id: number) {
  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}


}
