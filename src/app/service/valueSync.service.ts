import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PairForm } from "../interface/pairForm";
import { fields } from "../fields";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({providedIn: 'root'})
export class ValueSyncService {

  private pairForms: PairForm[] = [];
  private pairFormsSubject = new Subject<PairForm[]>();
  private apiURL = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) {
    this.pairFormsSubject = new BehaviorSubject<PairForm[]>(this.pairForms);
    // get data from the server and enable mocking form to submit the data
    this.getPairFormsFromServer().subscribe(pairForms => {
      this.pairForms = pairForms;
    });
  }

  setUpdatePairForms(pairForms: PairForm[]): void {
    this.pairForms = pairForms;
    this.pairFormsSubject.next(this.pairForms);

    // update all the forms to the server
    this.pairForms.forEach(pairForm => {
      this.updatePairForm(pairForm).subscribe();
    });
  }

  getPairFormsSubject(): Subject<PairForm[]> {
    return this.pairFormsSubject;
  }

  getPairForms(): PairForm[] {
    return this.pairForms;
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

  // API CRUD

  getPairFormsFromServer(): Observable<PairForm[]> {
    return this.http.get<PairForm[]>(this.apiURL);
  }

  updatePairForm(pairForm: PairForm): Observable<PairForm> {
    return this.http.put<PairForm>(`${this.apiURL}/${pairForm.label}`, pairForm, httpOptions);
  }

  addPairForm(pairForm: PairForm): Observable<PairForm> {
    console.log(`Add pair form: to the server`);
    return this.http.post<PairForm>(this.apiURL, pairForm, httpOptions);
  }

  deletePairForm(pairForm: PairForm): Observable<PairForm> {
    return this.http.delete<PairForm>(`${this.apiURL}/${pairForm.label}`, httpOptions);
  }

  // syncing service

  // since the customForm might be different in each component,
  // the syncForm function is defined inside the valueSync.service.ts for customization
  // the pairFormsSubject is used as an intermediate object to sync the forms locally
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
}