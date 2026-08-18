import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Invoice {
 // private apiUrl = '/api/invoices';
    private apiUrl = environment.apiUrl+'/schooladmin/invoices' 
   // private apiUrl = 'http://localhost:8080/api/schooladmin/invoices';


  constructor(private http: HttpClient) {}

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      this.apiUrl,
      invoice
    );
  }

  getNextInvoiceNumber(): Observable<{ nextInvoiceNumber: string }> {
    return this.http.get<{ nextInvoiceNumber: string }>(`${this.apiUrl}/next-number`);
  }

  getInvoices(searchText: string, page: number, size: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}?search=${searchText}&page=${page}&size=${size}`);
  }

  getInvoiceById(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${invoiceId}`);
  }

  updateInvoice(invoiceId: number, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/${invoiceId}`, invoice);
  }

  deleteInvoice(invoiceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${invoiceId}`);
  }
}
