import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSearch } from './parent-search';

describe('ParentSearch', () => {
  let component: ParentSearch;
  let fixture: ComponentFixture<ParentSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
