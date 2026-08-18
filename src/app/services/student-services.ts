import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentServices {
  //private apiUrl = 'http://localhost:8080/api/students';
  private apiUrl = environment.apiUrl +'/students';

  constructor(private http: HttpClient) { }

  getStudents(
    page: number,
    size: number,
    search: string
  ) {

    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}&search=${search}`
    );
  }

  getStudentById(id: number) {
  return this.http.get<any>(
    `${this.apiUrl}/${id}`
  );
}

updateStudent(id: number, student: any) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    student
  );  

}
createStudent(student: any) {
  return this.http.post(
    `${this.apiUrl}`,
    student
  );
}
deleteStudent(id: number) {
  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}

searchStudents(student: any, page: number, size: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/search?page=${page}&size=${size}`, { ...student });
  }

}
