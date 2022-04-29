import { AfterViewInit, Component, OnInit } from '@angular/core';
import { pairForms } from 'src/app/data';
import * as luckyexcel from 'luckyexcel';
import * as luckysheet from 'luckysheet';
import { PairForm } from 'src/app/pairForm';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  maxFillingTime: FormControl;
  maxPackingTime: FormControl;
  maxPressure: FormControl;

  constructor() {
    this.maxFillingTime = new FormControl(0);
    this.maxPackingTime = new FormControl(0);
    this.maxPressure = new FormControl(0);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  // reference: https://github.com/mengshukeji/Luckyexcel/blob/master/src/index.html
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

    luckyexcel.transformExcelToLucky(files[0], function(exportJson: any, luckysheetfile: any) {
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

  syncData() {
    // successfully get the entered value
    // after the value binding, can use the data.ts array to retrieve the added data again
    // TODO: how to get the cell value according to the user's specific cell value. e.g., A1
    const sheet = luckysheet.getSheet("Sheet1");
    let bindingValue = luckysheet.getCellValue(0, 0, sheet)
    // console.log(bindingValue)
    // console.log(JSON.stringify(pairForms));
    for (let p of pairForms) {
      if (p.label === 'maxFillingTime') {
        p.value = bindingValue;
        this.maxFillingTime.setValue(bindingValue);
        return
      }
    }
    console.log(`Cannot find the matching label.`);
  }
}
