import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServices } from '../../services/student-services';
import { Invoice } from '../../services/invoice';
import { Alertservice } from '../../services/alertservice';
import { Auth } from '../../services/auth';
import { ModalStudentSearch } from '../../student/modal-student-search/modal-student-search';



@Component({
  selector: 'app-create-invoices',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalStudentSearch],
  templateUrl: './create-invoices.html',
  styleUrls: ['./create-invoices.css'],
})
export class CreateInvoices implements OnInit {

  isAdmin = false;
  isParent = false;

  private authService =inject(Auth);


  invoiceForm!: FormGroup;

  feeTypes = [
    'Tuition Fee',
    'Bus Fee',
    'Books',
    'Exam Fee',
    'Sports Fee'
  ];

  // Use a loose type here to avoid missing import for the invoice service
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router
  ) { }

  private studentService = inject(StudentServices);
  private invoiceService: Invoice = inject(Invoice);
  private alertService = inject(Alertservice);

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
      parentId:[''],
      invoiceItems: this.fb.array([]),
      remarks: ['']
    });

    this.invoiceService.getNextInvoiceNumber().subscribe((number: any) => {
      console.log('Next invoice number: ', number.nextInvoiceNumber);
      this.invoiceForm.patchValue({
        invoiceNumber: number.nextInvoiceNumber
      });
    });

    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe((student: any) => {
        this.invoiceForm.patchValue({
          admissionNo: student.admissionNo,
          studentName: student.firstName + ' ' + student.lastName,
          className: student.className,
          parentName: student.parentName ,// Assuming parentName is the parent's name; adjust as necessary
          parentId: student.parentId
        });
      });
    }
    else{

    }

    this.addFeeItem();
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  addFeeItem() {

    this.invoiceItems.push(
      this.fb.group({
        feeType: ['', Validators.required],
        amount: [0],
        discount: [0],
        total: [{ value: 0, disabled: true }]
      })
    );
  }

  removeFeeItem(index: number) {
    this.invoiceItems.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal() {

    this.invoiceItems.controls.forEach(control => {

      const amount = Number(control.get('amount')?.value);
      const discount = Number(control.get('discount')?.value);

      control.get('total')?.setValue(amount - discount, { emitEvent: false });

    });

  }

  get grandTotal(): number {

    let total = 0;

    this.invoiceItems.controls.forEach(control => {

      total += Number(control.get('total')?.value);

    });

    return total;
  }

  saveInvoice() {

    console.log('input :' + JSON.stringify(this.invoiceForm.getRawValue()));
    this.invoiceService.createInvoice(this.invoiceForm.getRawValue()).subscribe({
      next: (response: any) => {
        console.log('Invoice created successfully:', response);
        this.invoiceForm.reset();
        this.alertService.success('Invoice created successfully');
      },
      error: (error: any) => {
        console.error('Error creating invoice:', error);
        this.alertService.error('Error creating invoice');
      }
    });

  }
  searchStudent() {
    const studentId = this.invoiceForm.get('studentId')?.value;
    if (studentId) {
      this.studentService.getStudentById(Number(studentId)).subscribe({
        next: (student: any) => {
          this.invoiceForm.patchValue({
            admissionNo: student.admissionNo,
            studentName: student.firstName + ' ' + student.lastName,
            className: student.className,
            parentName: student.parentName // Assuming parentName is the parent's name; adjust as necessary
          });
        },
        error: (error: any) => {
          console.error('Error fetching student:', error);
          this.alertService.error('Error fetching student');
        }
      });
    } else {
      this.alertService.warning('Please enter a valid Student ID');
    }
  }

  onStudentSelected(student: any) {

    console.log("Selected Student1:", student);

          this.invoiceForm.get('admissionNo')?.setValue(student.admissionNo),
          this.invoiceForm.get('studentName')?.setValue(student.firstName + ' ' + student.lastName),
          this.invoiceForm.get('className')?.setValue(student.className),
          this.invoiceForm.get('parentName')?.setValue(student.parentName),
          this.invoiceForm.get('studentId')?.setValue(student.studentId);


  /*this.invoiceForm.patchValue({
    admissionNo: student.admissionNo,
    studentName: student.firstName + ' ' + student.lastName,
    className: student.className,
    parentName: student.parentName
  }); */

}

makePayment()
{
  this.router.navigate(['/payment/create/', this.route.snapshot.paramMap.get('id')]);}
}
