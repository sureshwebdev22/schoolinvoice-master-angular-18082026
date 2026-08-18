
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Alertservice } from '../../services/alertservice';
import { timer } from 'rxjs';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-search-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-user.html',
  styleUrl: './search-user.css',
})
export class SearchUser {

  

  users: any[] = [];

  ngOnInit(): void {

    }


  private router = inject(Router);
  private userService = inject(UserService);
  private alertService = inject(Alertservice);
  private cdr = inject(ChangeDetectorRef);
  userSearchForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.userSearchForm = this.fb.group({
      searchText: ['']
    });
  }


  searchText: string = '';

  page = 0;

  size = 10;

  totalPages = 0;

  totalElements = 0;

  loading = false;

  loadUsers() {
    this.loading = true;
    timer(500).subscribe(() => {
      this.userService
        .getUsers(
          this.page,
          this.size,
          this.userSearchForm.value.searchText
        )
        .subscribe({
          next: (res: any) => {
            if (res && typeof res === 'object') {
              //     this.cdr.detectChanges();
              this.loading = false;
              this.users = [];
              this.users = (res as any).content;
              this.cdr.detectChanges();
              this.totalPages = (res as any).totalPages;
              this.totalElements = (res as any).totalElements;
              console.log('Users:', this.users.length);
               /* if (this.users.length === 0) {
                           

                this.alertService.warning('No Users found');
              } */
            }
          },
          error: (err:any) => {
             this.loading = false;
              this.users = [];
              this.cdr.detectChanges();
              this.alertService.error(err.error.message);
              

          }
        });
    });
  }

  searchUsers() {
    // this.users = [];
    this.page = 0;
    this.loadUsers();
    this.loading =false;
  }

  usercreate() {
    this.router.navigateByUrl('/user/create');
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }

  editUser(userId: any) {
    this.router.navigate(['/edit-user', userId]);
  }

  deleteUser(userId: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.alertService.success('User deleted successfully');
        this.loadUsers();
      });
    }
  }


}
