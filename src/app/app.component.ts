import { AfterViewInit, Component } from '@angular/core';
import { WindowService } from './service/window.service';
import * as luckysheet from 'luckysheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-Excel';

  constructor(private windowService: WindowService) {}

  ngOnInit(): void {
  }

  // TODO: replace Luckysheet logo and title with custom logo and title
  // TODO: add extra information for styling the luckysheet
  ngAfterViewInit() {
    let nativeWindow = this.windowService.nativeWindow;
    nativeWindow.$(() => {
      this.configureLuckysheet();
    })
  }

  private configureLuckysheet(): void {
    // configuration item
    var options = {
      container: 'luckysheet' // luckysheet is the container id
    }

    luckysheet.create(options);
  }
}
