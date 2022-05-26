import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/service/Window.service';
import * as luckysheet from 'luckysheet';

@Component({
  selector: 'app-ejector-layout',
  templateUrl: './ejector-layout.component.html',
  styleUrls: ['./ejector-layout.component.scss']
})
export class EjectorLayoutComponent implements OnInit {

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  // TODO: add extra information for styling the luckysheet
  ngAfterViewInit() {
    setTimeout(() => {
      let nativeWindow = this.windowService.nativeWindow;
      nativeWindow.$(() => {
        this.configureLuckysheet();
      })
    }, 200);
  }

  private configureLuckysheet(): void {
    // configuration item
    var options = {
      container: 'luckysheet', // luckysheet is the container id
      showinfobar: false,
    }

    luckysheet.create(options);
  }

}
