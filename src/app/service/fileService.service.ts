import { Injectable } from "@angular/core";
import * as luckyexcel from "luckyexcel";
import * as luckysheet from "luckysheet";


@Injectable({providedIn: 'root'})
export class FileService {
  constructor() { }

  convertExcelToLuckySheet(file: File): void {
    // reference: https://github.com/mengshukeji/Luckyexcel/blob/master/src/index.html
    luckyexcel.transformExcelToLucky(file, function(exportJson: any) {
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
}