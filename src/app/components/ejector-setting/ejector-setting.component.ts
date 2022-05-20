import { EjectorValueSyncService } from '../../service/valueSyncSystem/ejectorValueSync.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { EjectorValueBindingService } from '../..//service/valueBindingSystem/ejectorValueBinding.service';
import { EjectorForm } from 'src/app/interface/ejector';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-ejector-setting',
  templateUrl: './ejector-setting.component.html',
  styleUrls: ['./ejector-setting.component.scss']
})
export class EjectorSettingComponent implements OnInit {

  @ViewChild('table') table!: MatTable<EjectorForm>
  ejectSections: number[];
  ejectParams: string[];
  displayedColumns: string[] = ['section', 'label', 'cell', 'value'];
  ejectorForms: EjectorForm[] = [];
  selectedSection = new FormControl();
  selectedParam = new FormControl();
  id = 0; // temporary number as id attribute

  constructor(public ejBindService: EjectorValueBindingService, private ejSyncService: EjectorValueSyncService) {
    this.ejBindService.initCharHash();
    this.ejectSections = this.ejSyncService.getEjectSections();
    this.ejectParams = this.ejSyncService.getEjectorParams();

    // retrieve the pairForms from the server at the first time
    this.ejSyncService.ejectorApiService.getEjectorFormsFromServer().subscribe(ejectorForms => {
      this.ejectorForms = ejectorForms;
    })

    // subscribe to the changes of the forms subject
    this.ejSyncService.getEjectorFormsSubject().subscribe(ejectorForms => {
      this.ejectorForms = ejectorForms;
    })
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    let section = f.controls['selectedSection'].value;
    let param = f.controls['selectedParam'].value;
    let cell = f.controls['selectedCell'].value;
    this.id += 1;
    if (this.ejBindService.verifyCell(cell)) {
      let coordinate = this.ejBindService.convertCellToCoordinate(cell);
      let newBinding: EjectorForm = {
        id: this.id,
        section: section,
        label: param,
        cell: cell,
        coordinate: coordinate,
        value: 0
      }
      this.saveBindingInfo(newBinding);
      return
  } else {
      return
    }
  }
  
  saveBindingInfo(newBinding: EjectorForm): void {
    if (this.ejectorForms.length === 0) {
      this.addEjectorFormToServer(newBinding);
    } else {
      for (let p of this.ejectorForms) {
        // won't save the data with the same section and the same label; section should be unique
        if (p.section === newBinding.section && p.label === newBinding.label) {
          return
        } else if (p.section !== newBinding.section && p.label === newBinding.label && p.cell !== newBinding.cell) {
          p.cell = newBinding.cell;
          return
        } else {
          // different section, label, and cell
          this.addEjectorFormToServer(newBinding);
          return
        }
      }
    }
  }

  addEjectorFormToServer(newBinding: EjectorForm): void {
    console.log(`add the new binding to the server`);
    // save the new binding to the server
    this.ejSyncService.ejectorApiService.addEjectorForm(newBinding)
      .subscribe(() => {
        // push the new binding to the pairForms and re-render rows
        this.ejectorForms.push(newBinding);
        this.table ? this.table.renderRows() : '';
      }
    );
  }

  deleteRow(row: EjectorForm): void {
    console.log(`Trigger the delete function`);
    // delete the row from the server
    this.ejSyncService.ejectorApiService.deleteEjectorForm(row)
      .subscribe(() => {
        // delete the row from the pairForms
        this.ejectorForms = this.ejectorForms.filter(p => p.id !== row.id);
        this.ejSyncService.setUpdateEjectorForms(this.ejectorForms);
      }
    );
  }

}
