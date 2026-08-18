import { Component, ChangeDetectorRef } from '@angular/core';
import { Alertservice } from '../../services/alertservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {

  

  alert: any;

  timer: any;

  constructor(

      private alertService: Alertservice, private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {

    this.alertService.alert$

      .subscribe(alert => {

        this.alert = alert;
        this.cdr.detectChanges();

        


      });

  }

   closeAlert() {
    this.alertService.clear();
  }

}
