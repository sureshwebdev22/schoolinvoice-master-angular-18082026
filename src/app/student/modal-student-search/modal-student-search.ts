import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentServices } from '../../services/student-services';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs';

declare var bootstrap: any;


@Component({
  selector: 'app-modal-student-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-student-search.html',
  styleUrls: ['./modal-student-search.css'],
})
export class ModalStudentSearch {  

  private studentService = inject(StudentServices);
  private cdr = inject(ChangeDetectorRef);
  
  @Output()
  studentSelected = new EventEmitter<any>();

  studentSearchForm: FormGroup;

  students: any[] = [];

  page = 0;
  size = 10;
  totalPages = 0;

    loading = false;


  constructor(private fb: FormBuilder) {

    this.studentSearchForm = this.fb.group({
      'admissionNo': [''],
      'firstName': [''],
      'lastName': ['']
    });
  }

  searchStudents() {
    this.loading = true;
    
    timer(2000).subscribe(() => {
     this.studentService.searchStudents(this.studentSearchForm.value, this.page, this.size)
    .subscribe({
      next: (response: any) => {
         
          this.loading = false;
          this.students = response.content;
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();

      },
      error: (err:any) => {
        console.error(err);
      }
      
    });
  });
    
   /* this.parentService
      .searchParents( this.parentSearchForm.value, this.page, this.size).pipe(finalize(() => {this.loading = false;}))
      .subscribe(
        res => {
          this.loading = false;
          this.parents = res.content;
          this.totalPages = res.totalPages;
          this.cdr.detectChanges();
        },
        
      ); */
  }

  clearSearch() {
    this.studentSearchForm.reset();
    this.students = [];
    this.page = 0;
    this.totalPages = 0;
  }

  selectStudent(student: any) {

    console.log('Selected student:', student);
    // send selected student to student form
    this.studentSelected.emit(student);

    // close modal
    const modalEl = document.getElementById('studentSearchModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }

  nextPage() {
    this.page++;
    this.searchStudents();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.searchStudents();
    }
  }

  clear() {
    this.studentSearchForm.reset();
    this.students = [];
  }
}
