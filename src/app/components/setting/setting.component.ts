import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PairForm } from '../../interface/pairForm';
import { fields } from 'src/app/fields';
import { ValueBindingService } from '../../service/valueBinding.service';
import { ValueSyncService } from 'src/app/service/valueSync.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  @ViewChild('table') table!: MatTable<any>;
  selectedField = new FormControl();
  selectedCell = new FormControl();
  fields: string[] = fields;
  displayedColumns: string[] = ['label', 'cell', 'value'];
  pairForms: PairForm[] = [];

  constructor(public vbService: ValueBindingService, private vsService: ValueSyncService) {
    this.vbService.initCharHash();

    // retrieve the pairForms from the server at the first time
    this.vsService.getPairFormsFromServer().subscribe(pairForms => {
      this.pairForms = pairForms;
    })

    // subscribe to the changes of the pairForms subject
    this.vsService.getPairFormsSubject().subscribe(pairForms => {
      this.pairForms = pairForms;
    })
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
    if (this.pairForms.length === 0) {
      this.addPairFormToServer(newBinding);
    } else {
      for (let p of this.pairForms) {
        // won't save the data with the same label and the same cell
        if (p.label === newBinding.label && p.cell === newBinding.cell) {
          return
        } else if (p.label === newBinding.label && p.cell !== newBinding.cell) {
          p.cell = newBinding.cell;
          return
        } else {
          // different label with the same cell
          // different label with different cell
          this.addPairFormToServer(newBinding);
          return
        }
      }
    }
  }

  addPairFormToServer(newBinding: PairForm): void {
    this.vsService.addPairForm(newBinding)
      .subscribe(newBinding => {
        this.table.renderRows();
      });
  }
}
