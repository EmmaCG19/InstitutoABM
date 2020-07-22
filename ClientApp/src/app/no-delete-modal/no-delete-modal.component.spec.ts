import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDeleteModalComponent } from './no-delete-modal.component';

describe('NoDeleteModalComponent', () => {
  let component: NoDeleteModalComponent;
  let fixture: ComponentFixture<NoDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
