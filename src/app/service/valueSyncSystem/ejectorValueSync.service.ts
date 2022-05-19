import { ValueSyncService } from './valueSync.service';
import { EjectorApiService } from './../api/ejectorApi.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { EjectorForm } from 'src/app/interface/ejector';
import { ejectorParams, ejectSections } from '../properties/ejector';


@Injectable({providedIn: 'root'})
export class EjectorValueSyncService extends ValueSyncService {
  public ejectorApiService: EjectorApiService

  private ejectorFormsSubject = new Subject<EjectorForm[]>();
  private ejectorFomrs: EjectorForm[] = [];
  
  constructor(ejectorApiService: EjectorApiService) {
    super();
    this.ejectorApiService = ejectorApiService;
    this.ejectorFormsSubject = new BehaviorSubject<EjectorForm[]>(this.ejectorFomrs);
  }

  setUpdateEjectorForms(ejectorForms: EjectorForm[]): void {
    this.ejectorFomrs = ejectorForms;
    this.ejectorFormsSubject.next(this.ejectorFomrs);

    this.ejectorFomrs.forEach(ejectorForm => {
      this.ejectorApiService.updateEjectorForm(ejectorForm).subscribe();
    });
  }

  getEjectorFormsSubject(): Subject<EjectorForm[]> {
    return this.ejectorFormsSubject;
  }

  getEjectorForms(): EjectorForm[] {
    return this.ejectorFomrs;
  }

  syncLuckySheetWithEjector(ejectorForms: EjectorForm[], luckysheet: any, sheetName: string): void {
    for (let e of ejectorForms) {
      let x = e.coordinate.x;
      let y = e.coordinate.y;
      let value = e.value;
      luckysheet.setCellValue(y, x, value, sheetName);
    }
  }

  getEjectSections(): number[] {
    return ejectSections;
  }

  getEjectorParams(): string[] {
    return ejectorParams;
  }
}