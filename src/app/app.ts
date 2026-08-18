import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { NavBar } from "./nav-bar/nav-bar";
import { CommonModule } from '@angular/common';
import { Alert } from "./shared/alert/alert";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, NavBar, CommonModule, RouterOutlet, Alert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('schoolinvoice');

    isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }
}
