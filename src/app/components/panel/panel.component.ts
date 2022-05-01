import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import * as luckyexcel from 'luckyexcel';
import * as luckysheet from 'luckysheet';

import { fields } from 'src/app/fields';
import { PairForm } from 'src/app/interface/pairForm';
import { ValueBindingService } from 'src/app/service/valueBinding.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  maxFillingTime: FormControl;
  maxPackingTime: FormControl;
  maxPressure: FormControl;
  customForm: FormGroup;

  constructor(private vbService: ValueBindingService) {
    this.maxFillingTime = new FormControl(0);
    this.maxPackingTime = new FormControl(0);
    this.maxPressure = new FormControl(0);

    // the customeForm is used to find the specific formControl
    // TODO: a formGroup to add all the controls dynamically according to fields?
    this.customForm = new FormGroup({
      maxFillingTime: this.maxFillingTime,
      maxPackingTime: this.maxPackingTime,
      maxPressure: this.maxPressure
    });
  }

  ngOnInit(): void {
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

  syncData(): void {
    const sheet = luckysheet.getSheet("Sheet1");
    let pairForms: PairForm[] = this.vbService.getPairForms();

    for (let p of pairForms) {
      if (fields.includes(p.label)) {
        let bindingValue = luckysheet.
                            getCellValue(p.coordinate.getX(), p.coordinate.getY(), sheet)
        let control = this.getControl(this.customForm, p.label);

        if (control) {
          this.updateControlValue(control, bindingValue)
          p.value = bindingValue;
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

  getControl(formGroup: FormGroup, controlName: string): AbstractControl | null {
    return formGroup.get(controlName);
  }

  updateControlValue(control: AbstractControl, value: number): void {
    control.setValue(value);
  }


}
