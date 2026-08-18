import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenData = localStorage.getItem('token');
  const token = tokenData ? JSON.parse(tokenData).accessToken : null;
  if (token) {

      req = req.clone({

        setHeaders: {

          Authorization: `Bearer ${token}`

        }

      });

    }
  return next(req);
};
