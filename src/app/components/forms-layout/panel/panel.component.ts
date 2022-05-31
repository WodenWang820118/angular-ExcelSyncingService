import { Component } from '@angular/core';

import * as luckysheet from 'luckysheet';

import { PairForm } from 'src/app/interface/pairForm';
import { ExcelFileUploadService } from '../../../utilities/ExcelFileUpload.service';
import { ExcelFileDownloadService } from '../../../utilities/ExcelFileDownload.service';
import { PairFormSyncService } from '../../../service/PairFormService/PairFormSync.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  pairForms: PairForm[] = [];
  constructor(private pfSyncService: PairFormSyncService,
              private fileDownloadService: ExcelFileDownloadService,
              private fileUploadService: ExcelFileUploadService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // the luckysheet is initialized in the ngAfterViewInit in {app.component.ts}
    // therefore, to ensure the luckysheet is ready, the subscription is placed later

    setTimeout(() => {
      // retrieve the pairForms from the server at the first time
      this.pfSyncService.pairFormApiService.getPairFormsFromServer().subscribe(pairForms => {
        this.pairForms = pairForms;
        this.pfSyncService.syncLuckySheet(this.pairForms, luckysheet, "Sheet1");
      })
  
      // subscribe to the changes of the pairForms subject
      this.pfSyncService.getPairFormsSubject().subscribe(pairForms => {
        this.pairForms = pairForms;
        this.pfSyncService.syncLuckySheet(this.pairForms, luckysheet, "Sheet1");
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

    for (let p of this.pairForms) {
      if (this.pfSyncService.getFields().includes(p.label)) {

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
    this.pfSyncService.setUpdatePairForms(this.pairForms);
  }

  downloadExcel(): void {
    this.fileDownloadService.exportExcelData(luckysheet.getLuckysheetfile());
  }
}
