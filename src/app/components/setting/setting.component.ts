import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PairForm } from '../../interface/pairForm';
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
  displayedColumns: string[] = ['label', 'cell', 'value'];

  constructor(public vbService: ValueBindingService) {
    this.vbService.initCharHash();    
  }

  ngOnInit(): void {
  }

  onSubmit(f: any) {
    let field = f.controls.selectedField.value;
    let cell = f.controls.selectedCell.value;

    if (this.vbService.verifyCell(cell)) {
      let coordinate = this.vbService.convertCellToCoordinate(cell);
      let newBinding: PairForm = {
        label: field,
        cell: cell,
        coordinate: coordinate,
        value: 0
      }
      this.saveBindingInfo(newBinding);
    } else {
      return
    }
  }

  saveBindingInfo(newBinding: PairForm) {
    // TODO: need to write to a file to data checking
    let pairForms = this.vbService.getPairForms();
    if (pairForms.length === 0) {
      this.vbService.addPairForm(newBinding);
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
          this.vbService.addPairForm(newBinding);
        }
      }
    }
  }
}
