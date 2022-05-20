import { EjectorValueSyncService } from '../../../service/valueSyncSystem/ejectorValueSync.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EjectorForm } from '../../../interface/ejector';

@Component({
  selector: 'app-ejector',
  templateUrl: './ejector.component.html',
  styleUrls: ['./ejector.component.scss']
})
export class EjectorComponent {

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  maxSection = this.numbers[this.numbers.length - 1];
  sections: FormControl = new FormControl(0);
  ejectorForms: EjectorForm[] = []; // primitive forms to save the binding info
  ejectorFormGroupArray: FormGroup[] = []; // multiple ejectorForms according to the sections

  constructor(public ejSyncService: EjectorValueSyncService) {
    this.ejectorFormGroupArray = ejSyncService.initializeFormGroupArray(this.maxSection);

    // retrieve the pairForms from the server at the first time
    this.ejSyncService.ejectorApiService
      .getEjectorFormsFromServer()
      .subscribe((ejectorForms: EjectorForm[]) => {
        this.ejectorForms = ejectorForms;

        this.ejectorFormGroupArray = this.ejSyncService
          .setEjectorForms(
            ejectorForms,
            this.ejectorFormGroupArray,
            this.maxSection
          );
    })

    // subscribe to the changes of the forms subject
    this.ejSyncService
      .getEjectorFormsSubject()
      .subscribe((ejectorForms: EjectorForm[]) => {
        this.ejectorForms = ejectorForms;
        this.ejectorFormGroupArray = this.ejSyncService
          .setEjectorForms(
            ejectorForms,
            this.ejectorFormGroupArray,
            this.maxSection
          );
    })
  }

  getSelection(event: any) {
    let newValue = event.value;
    this.udpateSections(newValue);
  }

  udpateSections(newValue: number): void {
    this.sections.setValue(newValue);
  }
}
