import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjectorPanelComponent } from './ejector-panel.component';

describe('EjectorPanelComponent', () => {
  let component: EjectorPanelComponent;
  let fixture: ComponentFixture<EjectorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjectorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjectorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
