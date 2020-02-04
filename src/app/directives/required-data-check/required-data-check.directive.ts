import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[requiredDataCheck]'
})
export class RequiredDataCheckDirective implements AfterViewInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const elChildren = this.elRef.nativeElement.children;
    if (elChildren[0].localName === 'label' && (elChildren[1].localName === 'input' || elChildren[1].localName === 'textarea')) {
      const label: HTMLLabelElement = elChildren[0];
      const input: HTMLInputElement = elChildren[1];

      input.addEventListener('blur', () => {
        if (input.className.includes('invalid') && input.className.includes('dirty')) {
          this.renderer.addClass(label.children[0], 'mandatory-warning');
        }
      });

      input.addEventListener('focus', () => {
        this.renderer.removeClass(label.children[0], 'mandatory-warning');
      });
    } else {
      console.error('Directive not allowed on the attached element as it does not fulfill the eligibility requirements.');
    }
  }
}
