import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCreate } from './parent-create';

describe('ParentCreate', () => {
  let component: ParentCreate;
  let fixture: ComponentFixture<ParentCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
