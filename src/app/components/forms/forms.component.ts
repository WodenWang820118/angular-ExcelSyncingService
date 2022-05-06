import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValueSyncService } from 'src/app/service/valueSync.service';
import { fields } from 'src/app/fields';
import { PairForm } from 'src/app/interface/pairForm';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

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

    this.vsService.getPairFormsSubject().subscribe(pairForms => {
      this.syncForms(pairForms);
    })
  }

  ngOnInit(): void {
  }

  syncForms(pairForms: PairForm[]) {
    for (let p of pairForms) {
      if (fields.includes(p.label)) {
        let control = this.vsService.getControl(this.customForm, p.label);
     
        if (control) {
          this.vsService.updateControlValue(control, p.value)
        } else {
          console.log(`The control ${p.label} is not found`);
          return
        }
      } else {
        console.log(`Cannot find the field ${p.label}`);
        return
      }
    }
    console.log(`Successfully updata all the controls`);
  }
}
