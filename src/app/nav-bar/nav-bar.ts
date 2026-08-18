import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
 isAdmin = false;
  isParent = false;

    constructor(private authService: Auth) {}

  ngOnInit() {

    const role = this.authService.getRole();
    console.log('User role:', role); // Log the role for debugging
    this.isAdmin = role === 'ROLE_SCHOOL_ADMIN';
    this.isParent = role === 'ROLE_PARENT';
  }

  logout() {
    localStorage.removeItem('token');
  }

}
