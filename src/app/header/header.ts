import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header  {

  userRole: string | null = null;
  fullName: string | null = null;


  private router = inject(Router);
  private authService = inject(Auth);


  ngOnInit(): void {
    this.authService.authResponse.subscribe(response => {
      const authResponse = response as { fullName?: string | null } | null;
      this.fullName = authResponse?.fullName ?? null;
    });
  }



  logout(): void {

    this.authService.logout1();
   this.router.navigate(['/login']);


  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

}
