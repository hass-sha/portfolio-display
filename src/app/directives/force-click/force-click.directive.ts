import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * @description directive used to click on an element that it is tagged onto when the subject on it is triggered.
 */

@Directive({
  selector: '[forceClick]'
})
export class ForceClickDirective implements OnInit {
  @Input() trigger: Subject<boolean>;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.trigger.subscribe((onClick) => {
      if (onClick) {
        this.el.nativeElement.click();
      }
    });
  }

}
