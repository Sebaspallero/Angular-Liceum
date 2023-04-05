import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorHelpersComponent } from './form-error-helpers.component';

describe('FormErrorHelpersComponent', () => {
  let component: FormErrorHelpersComponent;
  let fixture: ComponentFixture<FormErrorHelpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorHelpersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorHelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
