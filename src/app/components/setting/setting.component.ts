import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PairForm } from '../../pairForm';
import { pairForms } from 'src/app/data';
import { CharHashPair } from './charHash';
import { Coordinate } from '../../Coordinate';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedField = new FormControl();
  selectedCell = new FormControl();

  fields: string[] = ['maxFillingTime', 'maxPackingTime', 'maxPressure'];
  charHash: CharHashPair[] = [];

  constructor() {
    this.initCharHash();
  }

  ngOnInit(): void {
  }

  // TODO: the algorithms and related functions should be in an independent service file

  /**
   * an array of objects for translating letters into numbers
   * for example, "A" equals to 0
   */
  initCharHash() {
    for (let i = 65; i < 91; i++) {
      this.charHash.push({
        'char': String.fromCharCode(65),
        'number': (i - 65)
      })
    }
  }

  onSubmit(f: any) {
    // console.log("The form has been submitted");
    let field = f.controls.selectedField.value;
    let cell = f.controls.selectedCell.value;
    // TODO: need to verify the user input
    // TODO: need to translate the cell's header letter to number to luckysheet.getCellValue()

    let isCellVerified = this.verifyCell(cell);

    if (isCellVerified) {
      // TODO: should translate the cell into a number here

      let newBinding: PairForm = {
        label: field,
        cell: cell,
        coordinate: new Coordinate(0, 0),
        value: 0
      }
      this.saveData(newBinding);
    } else {
      return
    }
  }

  verifyCell(cell: String): boolean {
    // TODO: should use regex for indentification
    if (this.isLetter(cell.toUpperCase())) {
      return true
    }
    alert("Invalid input");
    return false
  }

  isLetter(char: String) {
    return char.length === 1 && char.match(/[A-Z]/i);
  }

  /**
   * translate a char into a number 
   */
  translateChar() {
    // TODO: algorithm

  }

  translateCellToCoordinate(cell: String) {
    // all cell characters should be consistent
    // if the first letter, such as "A", then only convert A-Z to a number
    // AA will be (27 - 1) since A is 0
    // need to return a coordinate, considering the numbers after the characters
    for (let char of cell) {

    }
  }

  saveData(newBinding: PairForm) {
    // TODO: need to write to a file to data checking
    if (pairForms.length === 0) {
      pairForms.push(newBinding);
    } else {
      for (let p of pairForms) {
        // won't save the data with the same label and the same cell
        if (p.label === newBinding.label && p.cell === newBinding.cell) {
          return
        } else if (p.label === newBinding.label) {
          p.cell = newBinding.cell;
        } else {
          // different label with the same cell
          // different label with different cell
          pairForms.push(newBinding);
        }
      }
    }
  }


}
