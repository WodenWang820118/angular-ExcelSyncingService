import { AfterViewInit, Component } from '@angular/core';
import { WindowService } from './service/window.service';
import * as luckysheet from 'luckysheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-csv';

  constructor(private windowService: WindowService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let nativeWindow = this.windowService.nativeWindow;
    nativeWindow.$(function() {
      // configuration item
      var options = {
        container: 'luckysheet' // luckysheet is the container id
      }
      luckysheet.create(options);
    })
  }
}
