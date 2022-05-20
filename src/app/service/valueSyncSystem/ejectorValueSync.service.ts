import { ValueSyncService } from './valueSync.service';
import { EjectorApiService } from './../api/ejectorApi.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { EjectorForm } from 'src/app/interface/ejector';
import { ejectorParams, ejectSections } from '../properties/ejector';
import { FormControl, FormGroup } from '@angular/forms';


@Injectable({providedIn: 'root'})
export class EjectorValueSyncService extends ValueSyncService {
  public ejectorApiService: EjectorApiService

  private ejectorFormsSubject = new Subject<EjectorForm[]>();
  private ejectorForms: EjectorForm[] = [];
  
  constructor(ejectorApiService: EjectorApiService) {
    super();
    this.ejectorApiService = ejectorApiService;
    this.ejectorFormsSubject = new BehaviorSubject<EjectorForm[]>(this.ejectorForms);
  }

  setUpdateEjectorForms(ejectorForms: EjectorForm[]): void {    
    this.ejectorForms = ejectorForms;
    this.ejectorFormsSubject.next(this.ejectorForms);

    this.ejectorForms.forEach(ejectorForm => {
      this.ejectorApiService.updateEjectorForm(ejectorForm).subscribe();
    });
  }

  syncLuckySheetWithEjector(ejectorForms: EjectorForm[], luckysheet: any, sheetName: string): void {
    for (let e of ejectorForms) {
      let x = e.coordinate.x;
      let y = e.coordinate.y;
      let value = e.value;
      luckysheet.setCellValue(y, x, value, sheetName);
    }
  }

  initializeFormGroupArray(maxSection: number) {
    let ejectorFormGroupArray: FormGroup[] = [];
    for (let i = 0; i < maxSection; i++) {
      ejectorFormGroupArray.push(new FormGroup({
        section: new FormControl(i + 1),
        velocity: new FormControl(null),
        pressure: new FormControl(null),
        position: new FormControl(null)
      }));
    }
    return ejectorFormGroupArray;
  }

  setEjectorForms(ejectorForms: EjectorForm[], ejectorFormGroupArray: FormGroup[], maxSection: number): FormGroup[] {
    for (let i = 0; i < ejectorForms.length; i++) {
      // according to the section and label, set the value of the form group
      let formControlSection = ejectorForms[i].section;
      let formControlName = ejectorForms[i].label;
      let formControlValue = ejectorForms[i].value;

      for (let j = 0; j < maxSection; j++) {
        let formGroup = ejectorFormGroupArray[j];
        if (formGroup.controls['section'].value === formControlSection) {
          this.updateEjectorFormGroup(formGroup, formControlName, formControlValue);
        } else {
          // reset the value of the form group if the binding has been changed
          this.updateEjectorFormGroup(formGroup, formControlName, null);
        }
      }
    }
    return ejectorFormGroupArray;
  }

  updateEjectorFormGroup(formGroup: FormGroup, formControlName: string, formControlValue: any): void {
    switch (formControlName) {
      case 'velocity': {
        let control = this.getControl(formGroup, 'velocity');
        (control) ? control.setValue(formControlValue) : null;
        break;
      }
      case 'pressure': {
        let control = this.getControl(formGroup, 'pressure');
        (control) ? control.setValue(formControlValue) : null;
        break;
      }
      case 'position': {
        let control = this.getControl(formGroup, 'position');
        (control) ? control.setValue(formControlValue) : null;
        break;
      }
    }
  }

  syncEjectorForms(ejectorFormGroupArray: FormGroup[], ejectorForms: EjectorForm[]): EjectorForm[] {
    for (let formGroup of ejectorFormGroupArray) {
      let section = this.getSectionControl(formGroup);
      let velocity = this.getVelocityControl(formGroup);
      let pressure = this.getPressureControl(formGroup);
      let position = this.getPositionControl(formGroup);
      // update the value of the form group
      let ejectorForm = ejectorForms.find(ejectorForm => ejectorForm.section === section.value);
      if (ejectorForm) {
        ejectorForm['label'] === 'velocity' ? ejectorForm['value'] = velocity.value : null;
        ejectorForm['label'] === 'pressure' ? ejectorForm['value'] = pressure.value : null;
        ejectorForm['label'] === 'position' ? ejectorForm['value'] = position.value : null;
      }
    }
    return ejectorForms;
  }

  getSectionControl(formGroup: FormGroup): FormControl {
    return formGroup.controls['section'] as FormControl;
  }

  getVelocityControl(formGroup: FormGroup): FormControl {
    return formGroup.controls['velocity'] as FormControl;
  }

  getPressureControl(formGroup: FormGroup): FormControl {
    return formGroup.controls['pressure'] as FormControl;
  }

  getPositionControl(formGroup: FormGroup): FormControl {
    return formGroup.controls['position'] as FormControl;
  }

  getEjectSections(): number[] {
    return ejectSections;
  }

  getEjectorParams(): string[] {
    return ejectorParams;
  }

  getEjectorFormsSubject(): Subject<EjectorForm[]> {
    return this.ejectorFormsSubject;
  }

  getEjectorForms(): EjectorForm[] {
    return this.ejectorForms;
  }
}