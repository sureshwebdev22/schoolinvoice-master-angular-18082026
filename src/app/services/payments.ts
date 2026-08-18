import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Payments {

  // private apiUrl = 'http://localhost:8080/api/payments';
   private apiUrl = environment.apiUrl+'/payments';

  constructor(private http: HttpClient) { }

  savePayment(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  getPaymentHistory(invoiceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/invoice/${invoiceId}`);
  }
  getPayments(page: number, size: number, searchText: string): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      searchText: searchText || ''
    };
    return this.http.get<any>(this.apiUrl, { params });
  }

  deletePayment(paymentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${paymentId}`);
  } 

}
