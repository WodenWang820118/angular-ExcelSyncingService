import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjectorLayoutComponent } from './ejector-layout.component';

describe('EjectorLayoutComponent', () => {
  let component: EjectorLayoutComponent;
  let fixture: ComponentFixture<EjectorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjectorLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjectorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
