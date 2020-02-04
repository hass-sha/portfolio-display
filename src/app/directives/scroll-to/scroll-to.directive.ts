import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {
  @Input('scrollTo') targetElement: string;

  constructor() {
  }

  @HostListener('click') onClick() {
    if (this.targetElement !== '') {
      document.getElementById(this.targetElement).scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

}
