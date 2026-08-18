import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Alert } from '../shared/alert/alert';
import { CommonModule } from '@angular/common';
import { Alertservice } from '../services/alertservice';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})

export class Registration {

  registerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router); 
  private alertService = inject(Alertservice);

  constructor(  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });

  }

  

  register() {

   

    this.authService.register(this.registerForm.value)
      .subscribe({

        next: () => {

        //  alert("Registration Successful");
          

          this.alertService.success('Registration Successful')
          
          this.router.navigate(['/login']);



        },

        error: (err : any) => {

         // alert(err.error.message);
          this.alertService.error(err.error.message)

  
        }

      });

  }

}