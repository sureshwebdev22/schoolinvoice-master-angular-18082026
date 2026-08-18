import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvoices } from './list-invoices';

describe('ListInvoices', () => {
  let component: ListInvoices;
  let fixture: ComponentFixture<ListInvoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInvoices],
    }).compileComponents();

    fixture = TestBed.createComponent(ListInvoices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
