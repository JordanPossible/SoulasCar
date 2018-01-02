import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetTypesComponent } from './trajetTypes.component';

describe('TrajetTypesComponent', () => {
  let component: TrajetTypesComponent;
  let fixture: ComponentFixture<TrajetTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajetTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
