import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PairForm } from "../interface/pairForm";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

/**
 * @description This class is used to manage the data between the server and the valueBindingService
 */

@Injectable({providedIn: 'root'})
export class ValueSyncService {

  private pairForms: PairForm[] = [];
  private pairFormsSubject = new Subject<PairForm[]>();
  private apiURL = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) {
    this.pairFormsSubject = new BehaviorSubject<PairForm[]>(this.pairForms);
  }

  setUpdatePairForms(pairForms: PairForm[]) {
    this.pairForms = pairForms;
    this.pairFormsSubject.next(this.pairForms);
    // FIXME: this is not working
    this.updatePairForms(this.pairForms).subscribe();
  }

  getPairFormsSubject(): Subject<PairForm[]> {
    return this.pairFormsSubject;
  }

  getControl(formGroup: FormGroup, controlName: string): AbstractControl | null {
    return formGroup.get(controlName);
  }

  updateControlValue(control: AbstractControl, value: number): void {
    control.setValue(value);
  }

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

  updatePairForms(pairForms: PairForm[]): Observable<PairForm[]> {
    return this.http.put<PairForm[]>(this.apiURL, pairForms, httpOptions);
  }
}