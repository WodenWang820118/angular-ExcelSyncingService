import { EjectorValueSyncService } from '../../../service/EjectorService/ejectorValueSync.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { EjectorValueBindingService } from '../../../service/EjectorService/EjectorValueBinding.service';
import { EjectorForm } from 'src/app/interface/ejector';
import { MatTable } from '@angular/material/table';
import { IdGeneratorService } from 'src/app/service/IdGenerator.service';

@Component({
  selector: 'app-ejector-setting',
  templateUrl: './ejector-setting.component.html',
  styleUrls: ['./ejector-setting.component.scss']
})
export class EjectorSettingComponent implements OnInit {

  @ViewChild('table') table!: MatTable<EjectorForm>
  @ViewChild('cell') cell!: ElementRef;
  ejectSections: number[];
  ejectParams: string[];
  displayedColumns: string[] = ['section', 'label', 'cell', 'value'];
  ejectorForms: EjectorForm[] = [];
  selectedSection = new FormControl();
  selectedParam = new FormControl();

  constructor(public ejBindService: EjectorValueBindingService,
              private ejSyncService: EjectorValueSyncService,
              private idGenerator: IdGeneratorService) {
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
    if (this.ejBindService.verifyCell(cell)) {
      let coordinate = this.ejBindService.convertCellToCoordinate(cell);
      let newBinding: EjectorForm = {
        id: this.idGenerator.getUniqueId(),
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
    if (!this.checkEjectorFormFilled(newBinding)) {
      console.log(`the form is not filled`);
      return;
    } else if (this.ejectorForms.length === 0) {
      this.addEjectorFormToServer(newBinding);
    } else {
      for (let p of this.ejectorForms) {
        // won't save the data with the same section and the same label; section should be unique
        if (p.section === newBinding.section && p.label === newBinding.label) {
          console.log(`the section and the label are already existed`);
          return;
        } else {
          // different section, label, and cell
          this.addEjectorFormToServer(newBinding);
          return;
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

  clearField(): void {
    this.cell.nativeElement.value = '';
  }

  validateForm(f: NgForm): void {
    if (f.controls['selectedSection'].value === '') {
      f.controls['selectedSection'].setErrors({
        required: true
      });
    }
    if (f.controls['selectedParam'].value === '') {
      f.controls['selectedParam'].setErrors({
        required: true
      });
    }
    if (f.controls['selectedCell'].value === '') {
      f.controls['selectedCell'].setErrors({
        required: true
      });
    }
    return;
  }

  checkEjectorFormFilled(newBinding: EjectorForm): boolean {
    // console.log(`check the empty field`);
    let filled = false;
    Object.keys(newBinding).forEach(key => {
      // console.log(`${key}: ${(newBinding as any)[key]}`);
      if ((newBinding as any)[key] === '') {
        // console.log(`${key} is empty`);
        filled = false;
      }
    });
    console.log(filled);
    filled = true;
    return filled;
  }
}
