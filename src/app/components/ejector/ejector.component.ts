import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValueSyncService } from 'src/app/service/valueSync.service';
import { EjectorForm } from '../../interface/ejector';

@Component({
  selector: 'app-ejector',
  templateUrl: './ejector.component.html',
  styleUrls: ['./ejector.component.scss']
})
export class EjectorComponent {

  // default sections to be 0
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sections: FormControl = new FormControl(0);
  // a form group to hold the form controls
  ejectorForms: EjectorForm[] = []; // primitive forms to save the binding info
  
  // multiple ejectorForms according to the sections
  ejectorFormGroupArray: FormGroup[] = [];

  constructor(private vsService: ValueSyncService) {
    // retrieve the pairForms from the server at the first time
    this.vsService.getEjectorFormsFromServer().subscribe(ejectorForms => {
      this.ejectorForms = ejectorForms;
      this.setEjectorForms(ejectorForms);
    })

    // subscribe to the changes of the forms subject
    this.vsService.getEjectorFormsSubject().subscribe(ejectorForms => {
      this.ejectorForms = ejectorForms;
      this.setEjectorForms(ejectorForms);
    })
  }

  getSelection(event: any) {
    let newValue = event.value;
    this.udpateSections(newValue);
  }

  udpateSections(newValue: number): void {
    this.sections.setValue(newValue);
  }

  initializeFormGroupArray(sections: number) {
    this.ejectorFormGroupArray = [];
    for (let i = 0; i < sections; i++) {
      this.ejectorFormGroupArray.push(new FormGroup({
        section: new FormControl(null),
        velocity: new FormControl(null),
        pressure: new FormControl(null),
        position: new FormControl(null)
      }));
    }
  }

  // TODO: need to refactor the code according the real usage
  setEjectorForms(ejectorForms: EjectorForm[]): FormGroup[] {
    // reset the ejectorFormGroupArray and ready to be re-filled
    if (ejectorForms.length > 0) {
      this.ejectorFormGroupArray = [];
    }

    // initialize the form group each time
    // TODO: refactor to be more general, not just for two sections
    let ejectorFormGroup1: FormGroup = new FormGroup({
      section: new FormControl(null),
      velocity: new FormControl(null),
      pressure: new FormControl(null),
      position: new FormControl(null)
    });

    let ejectorFormGroup2: FormGroup = new FormGroup({
      section: new FormControl(null),
      velocity: new FormControl(null),
      pressure: new FormControl(null),
      position: new FormControl(null)
    });
    
    for (let i = 0; i < ejectorForms.length; i++) {
      // according to the section and label, set the value of the form group
      let formControlSection = ejectorForms[i].section;
      let formControlName = ejectorForms[i].label;
      let formControlValue = ejectorForms[i].value;
      
      if (formControlSection === 1) {
        switch (formControlName) {
          case 'velocity': {
            let control = this.vsService.getControl(ejectorFormGroup1, 'velocity');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
          case 'pressure': {
            let control = this.vsService.getControl(ejectorFormGroup1, 'pressure');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
          case 'position': {
            let control = this.vsService.getControl(ejectorFormGroup1, 'position');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
        }
      } else if (formControlSection === 2) {
        switch (formControlName) {
          case 'velocity': {
            let control = this.vsService.getControl(ejectorFormGroup2, 'velocity');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
          case 'pressure': {
            let control = this.vsService.getControl(ejectorFormGroup2, 'pressure');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
          case 'position': {
            let control = this.vsService.getControl(ejectorFormGroup2, 'position');
            (control) ? control.setValue(formControlValue) : null;
            break;
          }
        }
      }
    }
    this.ejectorFormGroupArray.push(ejectorFormGroup1);
    this.ejectorFormGroupArray.push(ejectorFormGroup2);
    return this.ejectorFormGroupArray;
  }

  syncEjectorForms(ejectorFormGroupArray: FormGroup[]) {
    for (let formGroup of ejectorFormGroupArray) {
      let section = this.getSectionControl(formGroup);
      let velocity = this.getVelocityControl(formGroup);
      let pressure = this.getPressureControl(formGroup);
      let position = this.getPositionControl(formGroup);
      // update the value of the form group
      let ejectorForm = this.ejectorForms.find(ejectorForm => ejectorForm.section === section.value);
      if (ejectorForm) {
        ejectorForm['label'] === 'velocity' ? ejectorForm['value'] = velocity.value : null;
        ejectorForm['label'] === 'pressure' ? ejectorForm['value'] = pressure.value : null;
        ejectorForm['label'] === 'position' ? ejectorForm['value'] = position.value : null;
      }
    }
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

}
