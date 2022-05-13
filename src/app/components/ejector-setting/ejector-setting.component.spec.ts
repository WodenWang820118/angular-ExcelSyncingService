import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjectorSettingComponent } from './ejector-setting.component';

describe('EjectorSettingComponent', () => {
  let component: EjectorSettingComponent;
  let fixture: ComponentFixture<EjectorSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjectorSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjectorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
