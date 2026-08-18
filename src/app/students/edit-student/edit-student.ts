import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServices } from '../../services/student-services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alertservice } from '../../services/alertservice';
import { SearchParent } from '../../parent/search-parent/search-parent';



@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, FormsModule, ReactiveFormsModule , SearchParent],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css'],
})

export class EditStudent implements OnInit {

  student: any = {};
  private studentService = inject(StudentServices);
  private alertService =inject(Alertservice);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  
  studentForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      'admissionNo': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'className': ['', Validators.required],
      'sectionName': [''],
      'parentId': [''],
       'parentName': [''],
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
            'parentId': this.student.parentId,
            'parentName': this.student.parentName,
          });
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  updateStudent(): void {
    this.studentService
      .updateStudent(this.student.studentId, this.studentForm.value)
      .subscribe({
        next: () => {
        //  alert('Student updated successfully');
         this.alertService.success('Student updated successfully');

          this.router.navigate(['/students']);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  onParentSelected(parent: any) {

    console.log("Selected Parent:", parent);

//
  this.studentForm.patchValue({
    parentId: parent.parentId,
    parentName:parent.fullName
  });

}

  ngOnInit(): void {
    
  }
}
