import { FileService } from './../../service/fileService.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as luckyexcel from 'luckyexcel';
import * as luckysheet from 'luckysheet';
import * as excel from 'exceljs';

import { fields } from 'src/app/fields';
import { PairForm } from 'src/app/interface/pairForm';
import { ValueSyncService } from 'src/app/service/valueSync.service';

// TODO: add the download function

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  pairForms: PairForm[] = [];
  constructor(private vsService: ValueSyncService, private fileService: FileService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // the luckysheet is initialized in the ngAfterViewInit in {app.component.ts}
    // therefore, to ensure the luckysheet is ready, the subscription is placed later

    setTimeout(() => {
      // retrieve the pairForms from the server at the first time
      this.vsService.getPairFormsFromServer().subscribe(pairForms => {
        this.pairForms = pairForms;
        this.vsService.syncLuckySheet(this.pairForms, luckysheet, "Sheet1");
      })
  
      // subscribe to the changes of the pairForms subject
      this.vsService.getPairFormsSubject().subscribe(pairForms => {
        this.pairForms = pairForms;
        this.vsService.syncLuckySheet(this.pairForms, luckysheet, "Sheet1");
      })
    }, 200);
  }

  parseXLSX(event: any) {
    const files = event.target.files;

    if (files == null || files.lengh == 0) {
      alert("No files wait for import");
      return;
    }

    let name = files[0].name;
    let suffixArr = name.split("."), suffix = suffixArr[suffixArr.length - 1];
    if (suffix != "xlsx") {
      alert("Currently only supports the import of xlsx files");
      return;
    }
    this.fileService.convertExcelToLuckySheet(files[0]);
  }

  syncData(): void {
    const sheet = luckysheet.getSheet("Sheet1");

    for (let p of this.pairForms) {
      if (fields.includes(p.label)) {

        let x: number = p.coordinate.x;
        let y: number = p.coordinate.y;
        
        let bindingValue = luckysheet.getCellValue(y, x, sheet);
        p.value = bindingValue;
      } else {
        console.log(`Cannot find the field ${p.label}`);
        return
      }
    }
    console.log(`Successfully update all the form values`);
    // send the pairForms to the valueSyncService
    this.vsService.setUpdatePairForms(this.pairForms);
  }

  downloadExcel(): void {
    
  }
}
