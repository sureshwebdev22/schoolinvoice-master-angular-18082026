import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoices } from './create-invoices';

describe('CreateInvoices', () => {
  let component: CreateInvoices;
  let fixture: ComponentFixture<CreateInvoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInvoices],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInvoices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
