import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValueSyncService } from 'src/app/service/valueSync.service';

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

  constructor(private vsService: ValueSyncService) {
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
    this.vsService.getPairFormsFromServer().subscribe(pairForms => {
      this.vsService.syncForms(pairForms, this.customForm);
    })

    // subscribe to the changes of the forms subject
    this.vsService.getPairFormsSubject().subscribe(pairForms => {
      this.vsService.syncForms(pairForms, this.customForm);
    })
  }

  // save the forms to the server
  saveForms(): void {
    let forms = this.vsService.getPairForms();
    forms.forEach(form => {
      form.value = Number(this.vsService.getControlValue(this.customForm, form.label));
    })

    this.vsService.setUpdatePairForms(forms);
  }
}
