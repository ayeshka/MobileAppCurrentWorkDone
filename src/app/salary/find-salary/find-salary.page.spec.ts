import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSalaryPage } from './find-salary.page';

describe('FindSalaryPage', () => {
  let component: FindSalaryPage;
  let fixture: ComponentFixture<FindSalaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSalaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
