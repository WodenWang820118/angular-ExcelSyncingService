import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EjectorForm } from '../../interface/ejector';

@Component({
  selector: 'app-ejector',
  templateUrl: './ejector.component.html',
  styleUrls: ['./ejector.component.scss']
})
export class EjectorComponent {

  // default sections to be 0
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sections: FormControl = new FormControl(0);
  // a form group to hold the form controls
  ejectorForms: EjectorForm[] = [];

  constructor() {

  }

  getSelection(event: any) {
    let newValue = event.value;
    this.udpateSections(newValue);
  }

  udpateSections(newValue: number): void {
    this.sections.setValue(newValue);
  }



}
