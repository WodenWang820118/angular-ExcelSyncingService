import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-Excel';
  selectedTemplate: string = '';
  currentRoute: string = '';
  templates: string[] = ['ejector', 'forms'];

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.selectedTemplate = 'ejector';
          this.router.navigate(['/','ejector']);
        }
      }
    })
  }

  onTemplateChange(template: string) {
    console.log(template);
    this.router.navigate(['/', template]);
  }
}
