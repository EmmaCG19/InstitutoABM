import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesCursosComponent } from './inscripciones-cursos.component';

describe('InscripcionesCursosComponent', () => {
  let component: InscripcionesCursosComponent;
  let fixture: ComponentFixture<InscripcionesCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
