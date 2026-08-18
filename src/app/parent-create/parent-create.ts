import { Component ,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ParentService } from '../services/parent-service';
import { CommonModule } from '@angular/common';
import { Alertservice } from '../services/alertservice';  

@Component({
  selector: 'app-parent-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parent-create.html',
  styleUrls: ['./parent-create.css'],
})
export class ParentCreate {

  private parentService = inject(ParentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
private alertService = inject(Alertservice);
  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      'fatherName': ['', Validators.required],
      'motherName': ['', Validators.required],
      'address': ['', Validators.required]
    });

}

createParent(): void {this.parentService.createParent(
      this.parentForm.value
    ).subscribe({
      next: (response:any) => {       
      this.router.navigate(['parent/search']);
      this.alertService.success('Parent Created successfully');

     //   this.parentForm.reset();
      },
      
      error: (err) => {
    //    this.alertService.error('Error creating parent');
        console.error(err);
      }
    });
}
}
