import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasHelperComponent } from './reservas-helper.component';

describe('ReservasHelperComponent', () => {
  let component: ReservasHelperComponent;
  let fixture: ComponentFixture<ReservasHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
