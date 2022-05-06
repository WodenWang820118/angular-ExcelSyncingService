import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { PairForm } from "../interface/pairForm";

@Injectable({providedIn: 'root'})
export class ValueSyncService {

  private pairForms: PairForm[] = [];
  private pairFormsSubject = new Subject<PairForm[]>();

  constructor() {
    this.pairFormsSubject = new BehaviorSubject<PairForm[]>(this.pairForms);
  }

  setUpdatePairForms(pairForms: PairForm[]) {
    this.pairForms = pairForms;
    this.pairFormsSubject.next(this.pairForms);
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
}