import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PairFormSyncService } from 'src/app/service/valueSyncSystem/pairFormSync.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  maxFillingTime: FormControl;
  maxPackingTime: FormControl;
  maxPressure: FormControl;
  customForm: FormGroup;

  constructor(private pfSyncService: PairFormSyncService) {
    this.maxFillingTime = new FormControl(0);
    this.maxPackingTime = new FormControl(0);
    this.maxPressure = new FormControl(0);

    // the customeForm is used to find the specific formControl
    this.customForm = new FormGroup({
      maxFillingTime: this.maxFillingTime,
      maxPackingTime: this.maxPackingTime,
      maxPressure: this.maxPressure
    });

    // retrieve the pairForms from the server at the first time
    this.pfSyncService.pairFormApiService.getPairFormsFromServer().subscribe(pairForms => {
      this.pfSyncService.syncForms(pairForms, this.customForm);
    })

    // subscribe to the changes of the forms subject
    this.pfSyncService.getPairFormsSubject().subscribe(pairForms => {
      this.pfSyncService.syncForms(pairForms, this.customForm);
    })
  }

  // save the forms to the server
  saveForms(): void {
    let forms = this.pfSyncService.getPairForms();
    forms.forEach(form => {
      form.value = Number(this.pfSyncService.getControlValue(this.customForm, form.label));
    })

    this.pfSyncService.setUpdatePairForms(forms);
  }
}
