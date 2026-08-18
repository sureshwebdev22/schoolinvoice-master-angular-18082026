import { ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { ParentService } from '../../services/parent-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { timer } from 'rxjs';


declare var bootstrap: any;

@Component({
  selector: 'app-search-parent',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-parent.html',
  styleUrl: './search-parent.css',
})
export class SearchParent {

  

  private parentService = inject(ParentService);
  private cdr = inject(ChangeDetectorRef);
  
  @Output()
  parentSelected = new EventEmitter<any>();

  parentSearchForm: FormGroup;

  parents: any[] = [];

  page = 0;
  size = 10;
  totalPages = 0;

    loading = false;


  constructor(private fb: FormBuilder) {

    this.parentSearchForm = this.fb.group({
      fullName: [''],
      email: [''],
      mobileNo: [''],
      address: ['']
    });
  }

  searchParents() {
    this.loading = true;
    
    timer(2000).subscribe(() => {
     this.parentService.searchParents(this.parentSearchForm.value, this.page, this.size)
    .subscribe({
      next: (response) => {
         
          this.loading = false;
          this.parents = response.content;
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();

      },
      error: (err) => {
        console.error(err);
      }
      
    });
  });
    
   /* this.parentService
      .searchParents( this.parentSearchForm.value, this.page, this.size).pipe(finalize(() => {this.loading = false;}))
      .subscribe(
        res => {
          this.loading = false;
          this.parents = res.content;
          this.totalPages = res.totalPages;
          this.cdr.detectChanges();
        },
        
      ); */
  }

  clearSearch() {
    this.parentSearchForm.reset();
    this.parents = [];
    this.page = 0;
    this.totalPages = 0;
  }

  selectParent(parent: any) {

    // send selected parent to student form
    this.parentSelected.emit(parent);

    // close modal
    const modalEl = document.getElementById('parentSearchModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }

  nextPage() {
    this.page++;
    this.searchParents();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.searchParents();
    }
  }

  clear() {
    this.parentSearchForm.reset();
    this.parents = [];
  }

}
function complete(error: any): void {
  throw new Error('Function not implemented.');
}

