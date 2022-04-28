import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/window.service';
import * as luckyexcel from 'luckyexcel';
import * as luckysheet from 'luckysheet';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit, AfterViewInit {

  constructor(private windowService: WindowService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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

    luckyexcel.transformExcelToLucky(files[0], function(exportJson: any, luckysheetfile: any) {
      if (exportJson.sheets == null || exportJson.sheets.lengh == 0) {
        alert("Failed to read the content of the excel file, currently does not support xls files!");
        return;
      }
      // console.log(exportJson, luckysheetfile);
      
      luckysheet.destroy();

      luckysheet.create({
        container: 'luckysheet', //luckysheet is the container id
        showinfobar: false,
        data:exportJson.sheets,
        title:exportJson.info.name,
        userInfo:exportJson.info.name.creator
      });
    })

    event.preventDefault();
  }
  
}
