import { CharHashPair } from '../interface/charHash';
import { Coordinate } from '../class/Coordinate';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export abstract class ValueBindingService {
  private charHash: CharHashPair[] = [];

  constructor() {
    this.initCharHash();
  }

  /**
   * an array of objects for translating letters into numbers
   * for example, "A" equals to 0
   */
  initCharHash(): void {
    for (let i = 65; i < 91; i++) {
      this.charHash.push({
        'char': String.fromCharCode(i),
        'number': (i - 65)
      })
    }
  }

  verifyCell(cell: string): boolean {
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

  isLetter(char: string): false | RegExpMatchArray | null {
    return char.length === 1 && char.match(/[A-Z]/i);
  }

  /**
   * convert the cell string to a coordinate
   * assume that the cell is valid
   * @see verifyCell() for validating the cell
   */
    convertCellToCoordinate(cell: string): Coordinate {
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

}