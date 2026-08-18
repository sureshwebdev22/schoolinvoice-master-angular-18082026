import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentServices } from '../../services/student-services';
import { SearchParent } from '../../parent/search-parent/search-parent';
import { Alertservice } from '../../services/alertservice';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchParent
  ],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css'
})
export class CreateStudent {

  private studentService = inject(StudentServices);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(Alertservice);

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.studentForm = this.fb.group({

      admissionNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],

      gender: [
        '',
        Validators.required
      ],

      className: [
        '',
        Validators.required
      ],

      sectionName: [
        '',
        Validators.required
      ],

      status: [
        '',
        Validators.required
      ],

      parentId: [
        '',
        Validators.required
      ],

      parentName: ['']

    });

  }

  get f() {
    return this.studentForm.controls;
  }

  createStudent(): void {

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;

    }

    this.studentService
      .createStudent(this.studentForm.value)
      .subscribe({

        next: () => {

          this.alertService.success(
            'Student created successfully'
          );

          this.router.navigate(['/students']);

        },

        error: (err) => {

          console.error(err);

          this.alertService.error(
            'Unable to create student.'
          );

        }

      });

  }

  onParentSelected(parent: any): void {

    this.studentForm.patchValue({

      parentId: parent.id,

      parentName: parent.fullName

    });

    this.studentForm.get('parentId')?.markAsTouched();

  }

}