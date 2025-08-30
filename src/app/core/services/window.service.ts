import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor() {}

  get windowRef() {
    return window;
  }

  scrollTop() {
    let scrollToTop = this.windowRef.setInterval(() => {
      let pos = this.windowRef.scrollY;
      if (pos > 0) {
        this.windowRef.scrollTo(0, 0);
      } else {
        this.windowRef.clearInterval(scrollToTop);
      }
    }, 50);
  }

  openLink(link: string, target: string = '_blank') {
    return this.windowRef.open(link, target);
  }
}
