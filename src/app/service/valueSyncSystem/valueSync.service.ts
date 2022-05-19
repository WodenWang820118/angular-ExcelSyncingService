import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Injectable({providedIn: 'root'})
export abstract class ValueSyncService {

  constructor() {
  }

  getControl(formGroup: FormGroup, controlName: string): AbstractControl | null {
    return formGroup.get(controlName);
  }

  getControlValue(formGroup: FormGroup, controlName: string): number {
    let control = this.getControl(formGroup, controlName);
    if (control) {
      return control.value;
    } else {
      return 0;
    }
  }

  updateControlValue(control: AbstractControl, value: number): void {
    control.setValue(value);
  }

}