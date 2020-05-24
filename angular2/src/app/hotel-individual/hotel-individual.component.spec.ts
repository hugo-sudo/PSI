import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelIndividualComponent } from './hotel-individual.component';

describe('HotelIndividualComponent', () => {
  let component: HotelIndividualComponent;
  let fixture: ComponentFixture<HotelIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
