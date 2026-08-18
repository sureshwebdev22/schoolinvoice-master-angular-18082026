import { Injectable, ChangeDetectorRef, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

export interface Alert {

  type: string;

  message: string;

}

@Injectable({
  providedIn: 'root'
})
export class Alertservice {

  private subject = new Subject<Alert>();

  alert$ = this.subject.asObservable();

  constructor(private router: Router) {
        // clear alert messages on route change unless 'showAfterRedirect' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                    // only keep for a single route change
                    // clear alert message
                    this.clear();
                }
            }
        );
    }

  success(message: string) {

    this.subject.next({

      type: 'success',

      message

    });

  }

  error(message: string) {

    this.subject.next({

      type: 'error',

      message

    });

  }

  warning(message: string) {

    this.subject.next({

      type: 'warning',

      message

    });

  }

  clear() {

    this.subject.next({

      type: '',

      message: ''

    });

  }

}