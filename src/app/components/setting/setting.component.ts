import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedFW = new FormControl();
  // TODO: a list of available options for value binding
  frameworks: string[] = ['Angular', 'Reactjs', 'Vue'];
  // TODO: sections of injection or packing pressures
  // TODO: FormControl groups for combining a group of data
  constructor() { }

  ngOnInit(): void {
  }

}
