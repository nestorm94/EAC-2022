import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modoulo3Component } from './modoulo3.component';

describe('Modoulo3Component', () => {
  let component: Modoulo3Component;
  let fixture: ComponentFixture<Modoulo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Modoulo3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Modoulo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
