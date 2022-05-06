import { Component, OnInit } from '@angular/core';

import * as luckyexcel from 'luckyexcel';
import * as luckysheet from 'luckysheet';

import { fields } from 'src/app/fields';
import { PairForm } from 'src/app/interface/pairForm';
import { ValueBindingService } from 'src/app/service/valueBinding.service';
import { ValueSyncService } from 'src/app/service/valueSync.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private vbService: ValueBindingService,
              private vsService: ValueSyncService) {
  }

  ngOnInit(): void {
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
    // reference: https://github.com/mengshukeji/Luckyexcel/blob/master/src/index.html
    luckyexcel.transformExcelToLucky(files[0], function(exportJson: any) {
      if (exportJson.sheets == null || exportJson.sheets.lengh == 0) {
        alert("Failed to read the content of the excel file, currently does not support xls files!");
        return;
      }
      
      luckysheet.destroy();
      luckysheet.create({
        container: 'luckysheet', //luckysheet is the container id
        showinfobar: false,
        data:exportJson.sheets,
        title:exportJson.info.name,
        userInfo:exportJson.info.name.creator
      });
    })
  }

  syncData(): void {
    const sheet = luckysheet.getSheet("Sheet1");
    let pairForms: PairForm[] = this.vbService.getPairForms();

    for (let p of pairForms) {
      if (fields.includes(p.label)) {
        let x: number = p.coordinate.getX();
        let y: number = p.coordinate.getY();
        
        let bindingValue = luckysheet.getCellValue(y, x, sheet);
        p.value = bindingValue;
      } else {
        console.log(`Cannot find the field ${p.label}`);
        return
      }
    }
    console.log(`Successfully update all the form values`);
    // send the pairForms to the valueSyncService
    this.vsService.setUpdatePairForms(pairForms);
  }
}
