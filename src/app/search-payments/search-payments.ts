import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Alertservice } from '../services/alertservice';
import { timer } from 'rxjs';
import { Auth } from '../services/auth';
import { Payments } from '../services/payments';


@Component({
  selector: 'app-search-payments',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-payments.html',
  styleUrl: './search-payments.css',
})
export class SearchPayments {

  
  //
  loading = false;
  payments: any[] = [];
  role: string | null = null;
  private authService = inject(Auth);
  isAdmin = false;
  isParent =false
  ngOnInit(): void {
    this.loading = false;
    this.role = this.authService.getRole(); // Call getRole() to ensure the role is set
    if(this.role){
      this.isAdmin = this.role === 'ROLE_SCHOOL_ADMIN';
      this.isParent = this.role === 'ROLE_PARENT';
    }
    console.log('User role:', this.role); // Log the role for debugging
  //  this.loadPayments();
  }


  private router = inject(Router);
  private paymentService = inject(Payments);
  private alertService = inject(Alertservice);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  paymentSearchForm: FormGroup;

  constructor() {

    this.paymentSearchForm = this.fb.group({
      searchText: ['']
    });
  }


  searchText: string = '';

  page = 0;

  size = 10;

  totalPages = 0;

  totalElements = 0;



  loadPayments() {
    this.cdr.detectChanges();
    this.loading = true;
    //timer(100).subscribe(() => {
      this.paymentService
        .getPayments(
          this.page,
          this.size,
          this.paymentSearchForm.value.searchText
        )
        .subscribe({
          next: (res: any) => {
            if (res && typeof res === 'object') {
              //     this.cdr.detectChanges();
              this.loading = false;
              this.payments = [];
              this.payments = (res as any).content;
              this.cdr.detectChanges();
              this.totalPages = (res as any).totalPages;
              this.totalElements = (res as any).totalElements;
              console.log('payments:', this.payments.length);
               /* if (this.payments.length === 0) {
                           

                this.alertService.warning('No payments found');
              } */
            }
          },
          error: (err:any) => {
      //      console.error('err'+ err);
            console.log('err '+ err)
              //this.payments = [];

            this.loading = false;
            this.payments = [];

            this.cdr.detectChanges();

            this.alertService.error(err.error.message);


          }
        });
   // });
  }

  searchPayments() {
    // this.payments = [];
    
    this.page = 0;
    this.loadPayments();
    this.loading =false;
    this.cdr.detectChanges();
  }

  studentcreate() {
    this.router.navigateByUrl('/student/create');
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPayments();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadPayments();
    }
  }

  editStudent(paymentId: any) {
    this.router.navigate(['/edit-student', paymentId]);
  }

  deletePayment(paymentId: any) {
    
    this.paymentService.deletePayment(paymentId).subscribe({
      next: (response: any) => {
        this.cdr.detectChanges();
        this.loadPayments();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete payment');
      }
    });
  }

  viewStudent(paymentId: any) {
    this.router.navigate(['/view-student/', paymentId]);
  }




}
