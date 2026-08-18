import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServices } from '../services/student-services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Alertservice } from '../services/alertservice';
import { timer } from 'rxjs';
import { Auth } from '../services/auth';




@Component({
  selector: 'app-students',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  //
  loading = false;
  students: any[] = [];
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
  //  this.loadStudents();
  }


  private router = inject(Router);
  private studentService = inject(StudentServices);
  private alertService = inject(Alertservice);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  studentSearchForm: FormGroup;

  constructor() {

    this.studentSearchForm = this.fb.group({
      searchText: ['']
    });
  }


  searchText: string = '';

  page = 0;

  size = 10;

  totalPages = 0;

  totalElements = 0;



  loadStudents() {
    this.cdr.detectChanges();
    this.loading = true;
    //timer(100).subscribe(() => {
      this.studentService
        .getStudents(
          this.page,
          this.size,
          this.studentSearchForm.value.searchText
        )
        .subscribe({
          next: (res: any) => {
            if (res && typeof res === 'object') {
              //     this.cdr.detectChanges();
              this.loading = false;
              this.students = [];
              this.students = (res as any).content;
              this.cdr.detectChanges();
              this.totalPages = (res as any).totalPages;
              this.totalElements = (res as any).totalElements;
              console.log('Students:', this.students.length);
               /* if (this.students.length === 0) {
                           

                this.alertService.warning('No students found');
              } */
            }
          },
          error: (err:any) => {
      //      console.error('err'+ err);
            console.log('err '+ err)
              //this.students = [];

            this.loading = false;
            this.students = [];

            this.cdr.detectChanges();

            this.alertService.error(err.error.message);


          }
        });
   // });
  }

  searchStudents() {
    // this.students = [];
    
    this.page = 0;
    this.loadStudents();
    this.loading =false;
    this.cdr.detectChanges();
  }

  studentcreate() {
    this.router.navigateByUrl('/student/create');
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadStudents();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadStudents();
    }
  }

  editStudent(studentId: any) {
    this.router.navigate(['/edit-student', studentId]);
  }

  deleteStudent(studentId: any) {
    
    this.studentService.deleteStudent(studentId).subscribe({
      next: (response: any) => {
        this.cdr.detectChanges();
        this.loadStudents();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete student');
      }
    });
  }

  viewStudent(studentId: any) {
    this.router.navigate(['/view-student/', studentId]);
  }



}
