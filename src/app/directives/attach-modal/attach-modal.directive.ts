import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[attachModal]'
})
export class AttachModalDirective implements OnInit {
  @Input() dataToggle: string;
  @Input() dataTarget: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.element.nativeElement, 'data-toggle', this.dataToggle);
    this.renderer.setAttribute(this.element.nativeElement, 'data-target', this.dataTarget);
  }

}
