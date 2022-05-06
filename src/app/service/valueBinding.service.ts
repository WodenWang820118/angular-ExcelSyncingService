import { CharHashPair } from '../../app/interface/charHash';
import { Coordinate } from '../../app/class/Coordinate';
import { Injectable } from '@angular/core';
import { PairForm } from '../interface/pairForm';

/**
 * @description This class is used to manage the data CRUD locally
 * 
 */

@Injectable({providedIn: 'root'})
export class ValueBindingService {
  private charHash: CharHashPair[] = [];
  private pairForms: PairForm[] = [];

  constructor() { }

  /**
   * an array of objects for translating letters into numbers
   * for example, "A" equals to 0
   */
  initCharHash() {
    for (let i = 65; i < 91; i++) {
      this.charHash.push({
        'char': String.fromCharCode(i),
        'number': (i - 65)
      })
    }
  }

  verifyCell(cell: String): boolean {
    if (cell.length > 4) {
      alert("The cell is limited to A-ZZ columns and the 0-99 number of rows");
      return false;
    } else if (cell.match(/(\d\w\d)/)) {
      alert(`non-characters in between numbers; ${cell} is not a valid cell; length: ${cell.length}`);
      return false;
    } else if (cell.match(/(\w\d\D)/)) {
      alert("Numbers in between non-characters");
      return false;
    } else if (cell.match(/[\W]/)) {
      alert("non-characters or non-numbers");
      return false;
    }
    return true
  }

  isLetter(char: String) {
    return char.length === 1 && char.match(/[A-Z]/i);
  }

  /**
   * convert the cell string to a coordinate
   * assume that the cell is valid
   * @see verifyCell() for validating the cell
   */
    convertCellToCoordinate(cell: String): Coordinate {
    let coordinate: Coordinate = new Coordinate(0, 0);
    let xSum: number = 0;
    let ySum = '';
    for (let char of cell) {
      if (this.isLetter(char.toUpperCase())) {
        let index = this.charHash.findIndex(c => c.char === char.toUpperCase());
        let numRepresentation = this.charHash[index].number;
        xSum += numRepresentation;
      } else {
        ySum += char;
      }
    }
    coordinate.setX(xSum);
    coordinate.setY(parseInt(ySum) - 1);
    return coordinate;
  }

  getCharHash(): CharHashPair[] {
    return this.charHash;
  }

  getPairForms(): PairForm[] {
    return this.pairForms;
  }

  setPairForms(pairForms: PairForm[]) {
    this.pairForms = pairForms;
  }

  addPairForm(pairForm: PairForm) {
    this.pairForms.push(pairForm);
  }
  
}