import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RichedTextFieldComponent} from './riched-text-field.component';

describe('RichedTextFieldComponent', () => {
  let component: RichedTextFieldComponent;
  let fixture: ComponentFixture<RichedTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichedTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichedTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
