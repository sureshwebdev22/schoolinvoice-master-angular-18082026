
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payments } from '../../services/payments';
import { Invoice } from '../../services/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-payment',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-payment.html',
  styleUrl: './create-payment.css',
})
export class CreatePayment {
  

  paymentForm!: FormGroup;

  invoice: any = {};

  paymentHistory: any[] = [];

  invoiceId!: number;

    private cdr = inject(ChangeDetectorRef);


  constructor(
    private fb: FormBuilder,
    private invoiceService: Invoice,
    private paymentService: Payments,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.paymentForm = this.fb.group({

      paymentDate: [new Date().toISOString().substring(0, 10), Validators.required],

      paymentMode: ['', Validators.required],

      amount: ['', [Validators.required, Validators.min(1)]],

      transactionReference: [''],

      remarks: ['']

    });

    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('this.invoiceId  '+this.invoiceId)

    this.loadInvoice();

   // this.loadPaymentHistory();

  }

  loadInvoice() {

    this.invoiceService.getInvoiceById(this.invoiceId)
      .subscribe({

        next: (response: any) => {
          console.log('response ' + JSON.stringify(response))
          this.invoice = response;
          this.invoice.invoiceNumber=response.invoiceNumber;
          this.invoice.studentName=response.studentDTO.firstName + ',' +response.studentDTO.lastName;
          this.invoice.totalAmount = response.totalAmount;
          this.invoice.balanceAmount =response.balanceAmount;
          this.invoice.paidAmount = response.paidAmount;
          this.invoice.parentId =response.parentId;
          this.cdr.detectChanges();

        },

        error: err => console.log(err)

      });

  }

  loadPaymentHistory() {

    this.paymentService.getPaymentHistory(this.invoiceId)
      .subscribe({

        next: (response: any) => {

          this.paymentHistory = response;
          this.cdr.detectChanges();

        },

        error: err => console.log(err)

      });

  }

  savePayment() {

    if (this.paymentForm.invalid) {
      return;
    }

    const payment = {

      invoiceId: this.invoiceId,

      paymentDate: this.paymentForm.value.paymentDate,

      paymentMode: this.paymentForm.value.paymentMode,

      amount: this.paymentForm.value.amount,

      transactionReference: this.paymentForm.value.transactionReference,

      remarks: this.paymentForm.value.remarks,

      studentId: this.invoice.studentDTO.id,

      studentName: this.invoice.studentDTO.firstName + ',' + this.invoice.studentDTO.lastName,
      
      invoiceNumber: this.invoice.invoiceNumber,

      parentId:this.invoice.parentId

    };

    this.paymentService.savePayment(payment)
      .subscribe({

        next: () => {

          alert("Payment saved successfully.");

          this.paymentForm.patchValue({

            paymentDate: new Date().toISOString().substring(0,10),

            paymentMode: '',

            amount: '',

            transactionReference: '',

            remarks: ''

          });

          this.loadInvoice();

          this.loadPaymentHistory();

        },

        error: err => {

          alert("Unable to save payment.");

          console.log(err);

        }

      });

  }
}
