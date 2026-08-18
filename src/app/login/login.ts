import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Alertservice } from '../services/alertservice'; 
import { email } from '@angular/forms/signals';
import { Authresponse } from '../models/authresponse';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  // initialize loginForm to satisfy definite assignment; adjust controls as needed
  loginForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(Alertservice);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(): void {
    this.auth.login(
      this.loginForm.value
    ).subscribe({
      next: (response: Authresponse) => {
        console.log('Login successful:', response);
       // this.alertService.success('Login Successful');
        localStorage.setItem(
          'token',
          JSON.stringify(response)
        );
     /*   localStorage.setItem(
          'role',
          response.role
        );*/
       this.router.navigateByUrl('/home'); // Navigate to dashboard on successful login 
      },

      error: (err:any) => {
        console.log('err '+ err);
        
          console.error(JSON.stringify(err));

          this.alertService.error(err.error.message          );
      }
    });
  }

}
