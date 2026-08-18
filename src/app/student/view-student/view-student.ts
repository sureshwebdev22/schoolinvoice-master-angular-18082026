import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServices } from '../../services/student-services';
import id from '@angular/common/locales/extra/id';
import { CommonModule, DatePipe } from '@angular/common';
import { disabled } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-student.html',
  styleUrls: ['./view-student.css'],
})
export class ViewStudent {

  isAdmin = false;
  isParent = false;

  private authService =inject(Auth);

   ngOnInit() {

    const role = this.authService.getRole();
    console.log('User role:', role); // Log the role for debugging
    this.isAdmin = role === 'ROLE_SCHOOL_ADMIN';
    this.isParent = role === 'ROLE_PARENT';
  }


 studentForm: FormGroup;
 
  student: any = {};
  private studentService = inject(StudentServices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      'admissionNo': [{ value: '', disabled: true }, Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'className': ['', Validators.required],
      'sectionName': [''],
      'parentName': [''],
    //  'parentId': [''],
      // 'parentName': [''],
      'status': ['']
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id)
      .subscribe({
        next: (data: any) => {
          this.student = data;
          console.log(this.student);
          this.studentForm.setValue({
            'admissionNo': this.student.admissionNo,
            'firstName': this.student.firstName,
            'lastName': this.student.lastName,
            'gender': this.student.gender,
            'className': this.student.className,
            'sectionName': this.student.sectionName,
            'status': this.student.status,
       //     'parentId': this.student.parentId,
             'parentName': this.student.parentName,
          });
        },
        error: (err: any) => {
          console.error(err);
        }
      });
      this.studentForm.disable();
  }

  addInvoice():void {
  //  const studentId = this.student.id;
    
  console.log('id  ' +this.route.snapshot.paramMap.get('id'));
  //  this.router.navigate(['/invoices/create', id]);
    
    this.router.navigate(['/invoices/create', this.route.snapshot.paramMap.get('id')]);
    //this.router.navigate(['/invoices/create'], { queryParams: { id } });
  }

  viewInvoice():void{
      console.log('id  ' +this.route.snapshot.paramMap.get('id'));

        this.router.navigate(['/invoices/list-invoice/', this.route.snapshot.paramMap.get('id')]);

  }

}
