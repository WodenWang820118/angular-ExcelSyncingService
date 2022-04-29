import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PairForm } from '../../pairForm';
import { pairForms } from 'src/app/dataSpec';
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedField = new FormControl();
  selectedCell = new FormControl();
  // TODO: dealing with one pair of binding first

  fields: string[] = ['maxFillingTime', 'maxPackingTime', 'maxPressure'];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: any) {
    console.log("The form has been submitted")
    // successfully get the field value and the cell value
    let field = f.controls.selectedField.value
    let cell = f.controls.selectedCell.value
    console.log(field)
    console.log(cell)

    let newBinding: PairForm = {
      label: field,
      cell: cell,
      value: 0
    }

    // TODO: need to write to the file
    pairForms.push(newBinding);
  }

  
}
