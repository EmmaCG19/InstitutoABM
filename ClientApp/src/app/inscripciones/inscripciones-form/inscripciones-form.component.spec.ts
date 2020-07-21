import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesFormComponent } from './inscripciones-form.component';

describe('InscripcionesFormComponent', () => {
  let component: InscripcionesFormComponent;
  let fixture: ComponentFixture<InscripcionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
