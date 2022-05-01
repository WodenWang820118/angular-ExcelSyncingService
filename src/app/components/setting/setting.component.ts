import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PairForm } from '../../interface/pairForm';
import { pairForms } from 'src/app/data';
import { fields } from 'src/app/fields';
import { ValueBindingService } from '../../service/valueBinding.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedField = new FormControl();
  selectedCell = new FormControl();

  fields: string[] = fields;

  constructor(private vbService: ValueBindingService) {
    this.vbService.initCharHash();
  }

  ngOnInit(): void {
  }

  onSubmit(f: any) {
    let field = f.controls.selectedField.value;
    let cell = f.controls.selectedCell.value;

    if (this.vbService.verifyCell(cell)) {
      let coordinate = this.vbService.convertCellToCoordinate(cell);
      // console.log(`The coordinate is ${coordinate.getX()}, ${coordinate.getY()}`);
      let newBinding: PairForm = {
        label: field,
        cell: cell,
        coordinate: coordinate,
        value: 0
      }
      this.saveData(newBinding);
    } else {
      return
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