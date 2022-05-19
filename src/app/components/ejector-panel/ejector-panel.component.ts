import { EjectorValueSyncService } from './../../service/valueSyncSystem/ejectorValueSync.service';
import { Component, OnInit } from '@angular/core';

import * as luckysheet from 'luckysheet';

import { FileUploadService } from 'src/app/service/utilities/fileUpload.service';
import { FileDownloadService } from '../../service/utilities/fileDownload.service';
import { EjectorForm } from 'src/app/interface/ejector';

@Component({
  selector: 'app-ejector-panel',
  templateUrl: './ejector-panel.component.html',
  styleUrls: ['./ejector-panel.component.scss']
})
export class EjectorPanelComponent implements OnInit {

  ejectorForms: EjectorForm[] = [];
  constructor(private ejSyncService: EjectorValueSyncService,
              private fileDownloadService: FileDownloadService,
              private fileUploadService: FileUploadService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // the luckysheet is initialized in the ngAfterViewInit in {app.component.ts}
    // therefore, to ensure the luckysheet is ready, the subscription is placed later

    setTimeout(() => {
      // retrieve the pairForms from the server at the first time
      this.ejSyncService.ejectorApiService.getEjectorFormsFromServer().subscribe(ejectorForms => {
        this.ejectorForms = ejectorForms;
        // for future usage to birng back the data from the server and update the excel
        // this.vsService.syncLuckySheet(this.ejectorForms, luckysheet, "Sheet1");
      })
  
      // subscribe to the changes of the pairForms subject
      this.ejSyncService.getEjectorFormsSubject().subscribe(ejectorForms => {
        this.ejectorForms = ejectorForms;
        // for future usage to birng back the data from the server and update the excel
        // this.vsService.syncLuckySheet(this.ejectorForms, luckysheet, "Sheet1");
      })
    }, 1000);
  }

  parseXLSX(event: any): void {
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
    this.fileUploadService.convertExcelToLuckySheet(files[0]);
  }

  syncData(): void {
    // TODO: need to take the sheet name from the user
    const sheet = luckysheet.getSheet("Sheet1");

    for (let p of this.ejectorForms) {
      let x: number = p.coordinate.x;
      let y: number = p.coordinate.y;
        
      let bindingValue = luckysheet.getCellValue(y, x, sheet);
      p.value = bindingValue;
    }
    console.log(`Successfully update all the form values`);
    // send the pairForms to the valueSyncService
    this.ejSyncService.setUpdateEjectorForms(this.ejectorForms);
  }

  downloadExcel(): void {
    this.fileDownloadService.exportExcelData(luckysheet.getLuckysheetfile());
  }

}
