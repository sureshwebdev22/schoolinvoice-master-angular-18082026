import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { Alertservice } from '../../services/alertservice';
//import { Invoice } from '../../services/invoice';
//import { StudentServices } from '../../services/student-services';
import { StudentServices } from '../../services/student-services';
//import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../services/invoice';
import { CommonModule } from '@angular/common';
import { disabled } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-view-invoice',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-invoice.html',
  styleUrls: ['./view-invoice.css'],
})
export class ViewInvoice {

  invoiceForm!: FormGroup;
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(Auth);
  feeTypes = [
    'Tuition Fee',
    'Bus Fee',
    'Books',
    'Exam Fee',
    'Sports Fee'
  ];

  isAdmin = false;
  isParent = false;

  // Use a loose type here to avoid missing import for the invoice service
  constructor(private fb: FormBuilder, private route: ActivatedRoute
  ) { }

  private studentService = inject(StudentServices);
  private invoiceService = inject(Invoice);
  private alertService = inject(Alertservice);
  private router = inject(Router);

  ngOnInit(): void {

     const role = this.authService.getRole();
    console.log('User role:', role); // Log the role for debugging
    this.isAdmin = role === 'ROLE_SCHOOL_ADMIN';
    this.isParent = role === 'ROLE_PARENT';

    this.invoiceForm = this.fb.group({
      invoiceNumber: [''],
      invoiceDate: [new Date().toISOString().substring(0, 10)],
      dueDate: ['', Validators.required],
      studentId: [this.route.snapshot.paramMap.get('id') || ''],
      admissionNo: [''],
      studentName: [''],
      className: [''],
      parentName: [''],
      invoiceItems: this.fb.array([]),
      remarks: ['']
    });

    const invoiceItemsArray = this.invoiceForm.get('invoiceItems') as FormArray;

//invoiceItemsArray.clear();


    this.invoiceService.getNextInvoiceNumber().subscribe((number: any) => {
      console.log('Next invoice number: ', number.nextInvoiceNumber);
      this.invoiceForm.patchValue({
        invoiceNumber: number.nextInvoiceNumber
      });
    });

    const invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    if (invoiceId) {
      this.invoiceService.getInvoiceById(invoiceId).subscribe((invoice: any) => {
       
       // const invoiceItemsArray = this.invoiceForm.get('invoiceItems') as FormArray;  
        invoiceItemsArray.clear();
        invoice.invoiceItems.forEach((item: any) => {
          invoiceItemsArray.push(this.fb.group({
            feeType: [item.feeType, { disabled: true }],
            amount: [item.amount, { disabled: true }]
          }));
        });

        this.cdr.detectChanges();
        console.log('Invoice items after loading:', invoiceItemsArray.length);
         this.invoiceForm.patchValue({
          admissionNo: invoice.studentDTO.admissionNo,
          className: invoice.studentDTO.className,
          studentId: invoice.studentDTO.id,
          section: invoice.studentDTO.section,
          studentName: invoice.studentDTO.firstName + ' ' + invoice.studentDTO.lastName,
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          dueDate: invoice.dueDate,
          parentName: invoice.studentDTO.parentName, // Assuming parentName is the parent's name; adjust as necessary
          remarks: invoice.remarks,
           invoiceItems: invoice.invoiceItems.map((item: any) => this.fb.group({
            feeType: [{value:item.feeType,  disabled: true }],
            amount: [{value:item.amount, disabled: true }]

          })) 
        });

      });
      
   
    } else {
      this.alertService.error('No invoice ID provided in the route.');
    }
    
    this.invoiceForm.disable(); // Disable the form to make it read-only
    this.cdr.detectChanges();
   // this.invoiceForm.get('invoiceItems')?.disable(); // Disable the invoice items FormArray to make it read-only
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  createInvoice() {
    this.router.navigateByUrl('/invoices/create');

  }
  makePayment(){
        this.router.navigateByUrl('payment/create/'+Number(this.route.snapshot.paramMap.get('id')));

  }
  cancelInvoice() {
    // Navigate back to the invoice list or previous page
    window.history.back();
  }
} 
      
