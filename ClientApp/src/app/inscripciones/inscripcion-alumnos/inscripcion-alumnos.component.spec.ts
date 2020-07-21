import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAlumnosComponent } from './inscripcion-alumnos.component';

describe('InscripcionAlumnosComponent', () => {
  let component: InscripcionAlumnosComponent;
  let fixture: ComponentFixture<InscripcionAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
