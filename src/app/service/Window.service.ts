import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({providedIn: 'root'})
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }

  _window(): object {
    return window;
  }
}