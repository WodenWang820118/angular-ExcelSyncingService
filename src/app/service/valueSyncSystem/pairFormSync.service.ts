import { ValueSyncService } from './valueSync.service';
import { Injectable } from "@angular/core";
import { PairForm } from 'src/app/interface/pairForm';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { fields } from '../properties/fields';
import { PairFormApiService } from '../api/pairFormApi.service';

@Injectable({providedIn: 'root'})
export class PairFormSyncService extends ValueSyncService {
  public pairFormApiService: PairFormApiService;

  private pairForms: PairForm[] = [];
  private pairFormsSubject = new Subject<PairForm[]>();

  constructor(pairFormApiService: PairFormApiService) {
    super();
    this.pairFormApiService = pairFormApiService;
    this.pairFormsSubject = new BehaviorSubject<PairForm[]>(this.pairForms);
  }

  setUpdatePairForms(pairForms: PairForm[]): void {
    this.pairForms = pairForms;
    this.pairFormsSubject.next(this.pairForms);

    // update all the forms to the server
    this.pairForms.forEach(pairForm => {
      this.pairFormApiService.updatePairForm(pairForm).subscribe();
    });
  }

  getPairFormsSubject(): Subject<PairForm[]> {
    return this.pairFormsSubject;
  }

  getPairForms(): PairForm[] {
    return this.pairForms;
  }

  syncForms(pairForms: PairForm[], customForm: FormGroup): void {
    for (let p of pairForms) {
      if (fields.includes(p.label)) {
        let control = this.getControl(customForm, p.label);
     
        if (control) {
          this.updateControlValue(control, p.value)
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

  syncLuckySheet(pairForms: PairForm[], luckysheet: any, sheetName: string): void {
    for (let p of pairForms) {
      let x = p.coordinate.x;
      let y = p.coordinate.y;
      let value = p.value;
      luckysheet.setCellValue(y, x, value, sheetName);
    }   
  }

  getFields(): string[] {
    return fields;
  }
}