import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudentSearch } from './modal-student-search';

describe('ModalStudentSearch', () => {
  let component: ModalStudentSearch;
  let fixture: ComponentFixture<ModalStudentSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStudentSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalStudentSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
