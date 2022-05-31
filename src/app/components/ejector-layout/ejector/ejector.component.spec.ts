import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjectorComponent } from './ejector.component';

describe('EjectorComponent', () => {
  let component: EjectorComponent;
  let fixture: ComponentFixture<EjectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
