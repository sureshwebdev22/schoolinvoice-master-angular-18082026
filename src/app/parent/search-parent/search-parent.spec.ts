import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParent } from './search-parent';

describe('SearchParent', () => {
  let component: SearchParent;
  let fixture: ComponentFixture<SearchParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchParent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
