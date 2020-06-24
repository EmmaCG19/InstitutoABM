import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasMateriasComponent } from './carreras-materias.component';

describe('CarrerasMateriasComponent', () => {
  let component: CarrerasMateriasComponent;
  let fixture: ComponentFixture<CarrerasMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrerasMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
