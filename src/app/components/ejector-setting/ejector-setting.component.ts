import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EjectorValueBindingService } from 'src/app/service/ejectorValueBinding.service';
import { EjectorForm } from 'src/app/interface/ejector';

@Component({
  selector: 'app-ejector-setting',
  templateUrl: './ejector-setting.component.html',
  styleUrls: ['./ejector-setting.component.scss']
})
export class EjectorSettingComponent implements OnInit {

  ejectSections: number[];
  ejectParams: string[];
  displayedColumns: string[] = ['section', 'params', 'label', 'cell', 'value'];
  ejectorForms: EjectorForm[] = [];

  constructor(public ejService: EjectorValueBindingService) {
    this.ejService.initCharHash();
    this.ejectSections = this.ejService.getEjectSections();
    this.ejectParams = this.ejService.getEjectorParams();
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    // let field = f.controls['selectedField'].value;
    // let cell = f.controls['selectedCell'].value;

    // if (this.ejService.verifyCell(cell)) {
    //   let coordinate = this.ejService.convertCellToCoordinate(cell);
    //   let newBinding: PairForm = {
    //     label: field,
    //     cell: cell,
    //     coordinate: coordinate,
    //     value: 0
    //   }
    //   this.saveBindingInfo(newBinding);
    // } else {
    //   return
    // }
  }
  
  saveBindingInfo(newBinding: EjectorForm): void {
    // if (this.pairForms.length === 0) {
    //   this.addPairFormToServer(newBinding);
    // } else {
    //   for (let p of this.pairForms) {
    //     // won't save the data with the same label and the same cell
    //     if (p.label === newBinding.label && p.cell === newBinding.cell) {
    //       return
    //     } else if (p.label === newBinding.label && p.cell !== newBinding.cell) {
    //       p.cell = newBinding.cell;
    //       return
    //     } else {
    //       // different label with the same cell
    //       // different label with different cell
    //       this.addPairFormToServer(newBinding);
    //       return
    //     }
    //   }
    // }
  }

  addPairFormToServer(newBinding: EjectorForm): void {
    // console.log(`add the new binding to the server`);
    // // save the new binding to the server
    // this.vsService.addPairForm(newBinding)
    //   .subscribe(() => {
    //     // push the new binding to the pairForms and re-render rows
    //     this.pairForms.push(newBinding);
    //     this.table ? this.table.renderRows() : '';
    //   }
    // );
  }

  deleteRow(row: EjectorForm): void {
    // console.log(`Trigger the delete function`);
    // // delete the row from the server
    // this.vsService.deletePairForm(row)
    //   .subscribe(() => {
    //     // delete the row from the pairForms
    //     this.pairForms = this.pairForms.filter(p => p.label !== row.label);
    //   }
    // );
  }

}
