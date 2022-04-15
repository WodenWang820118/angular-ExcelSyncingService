import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async parseXLSX(event: any) {
    const fileRes = event.currentTarget.files[0];
    const buffer = await this.readFile(fileRes);
    console.log(buffer);
    this.generateExcelWorkbook(buffer);
    
  }

  readFile(fileRes: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileRes);
      reader.onload = () => {
        resolve(reader.result);
      }
    })
  }

  async generateExcelWorkbook(buffer: any) {
    const workbook = new Excel.Workbook()
    const file = await workbook.xlsx.load(buffer as Buffer);
    const sheet = file.getWorksheet("sheet1");
    sheet.eachRow((row, rowNumber) => {
      console.log(row.values)
    })
  }
}
