import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPayments } from './search-payments';

describe('SearchPayments', () => {
  let component: SearchPayments;
  let fixture: ComponentFixture<SearchPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPayments],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
