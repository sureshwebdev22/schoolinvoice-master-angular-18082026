import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Alertservice } from '../../services/alertservice';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUser {

  userForm: FormGroup;

  private userService = inject(UserService);
  private alertService = inject(Alertservice);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],

      dateOfBirth: [
        '',
        Validators.required
      ],

      gender: [
        '',
        Validators.required
      ],

      mobileNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      role: [
        '',
        Validators.required
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ]

    });

  }

  /**
   * Shortcut for accessing form controls
   */
  get f() {
    return this.userForm.controls;
  }

  /**
   * Create User
   */
  createUser(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      this.alertService.error(
        'Please fill all required fields correctly.'
      );

      return;
    }

    this.userService
      .createUser(this.userForm.value)
      .subscribe({

        next: (data: any) => {

          console.log('User created successfully', data);

          this.alertService.success(
            `${data.role} ${data.fullName} created successfully!`
          );

          this.userForm.reset();

          this.router.navigate(['/user/search']);

        },

        error: (err: any) => {

          console.error(err);

          this.alertService.error(
            err?.error?.message ||
            err?.message ||
            'Error creating user.'
          );

        }

      });

  }

  /**
   * Reset Form
   */
  resetForm(): void {

    this.userForm.reset();

  }

}