import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        console.log('Unauthorized access - redirecting to login.');
        localStorage.removeItem('token'); // Clear token on unauthorized access
        router.navigate(['/login']);
      } else if (error.status === 403) {
        localStorage.removeItem('token'); // Clear token on unauthorized access
        router.navigate(['/login']);

        console.log('Access denied - you do not have permission to perform this action.');
      } else if (error.status === 404) {
        localStorage.removeItem('token'); // Clear token on unauthorized access
        router.navigate(['/login']);

        console.log('Resource not found - please check the URL or resource availability.');
      } else if (error.status === 500) {
        localStorage.removeItem('token'); // Clear token on unauthorized access
        router.navigate(['/login']);

        console.log('Internal server error - please try again later.');
      } else {
        console.log(`An unexpected error occurred: ${error.message}`);
      }

      return throwError(() => error);
    })
  );
};
