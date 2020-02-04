import {Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {NgRecaptchaService} from '../../services/ng-recaptcha.service';

@Directive({
  selector: '[ngRecaptcha]'
})
export class NgRecaptchaDirective implements OnInit {
  @Input() key: string;
  @Input() config: ReCaptchaConfig = {};
  @Input() lang: string;
  @Output() success = new EventEmitter<string>();
  @Output() expired = new EventEmitter();

  private widgetId: number;

  constructor(private element: ElementRef, private ngZone: NgZone, private recaptchaService: NgRecaptchaService) {}

  ngOnInit(): void {
    this.registerReCaptchaCallback();
    this.addScript();
    this.recaptchaService.execute = this.execute;
    this.recaptchaService.reset = this.reset;
    this.recaptchaService.getResponse = this.getResponse;
  }

  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement, config);
    };
  }

  private render(element: HTMLElement, config): number {
    return grecaptcha.render(element, config);
  }

  execute() {
    return grecaptcha.execute(this.widgetId);
  }

  reset() {
    return grecaptcha.reset(this.widgetId);
  }

  getResponse() {
    return grecaptcha.getResponse(this.widgetId);
  }

  addScript() {
    const script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  onExpired() {
    this.ngZone.run(() => {
      this.expired.emit();
    });
  }

  onSuccess(response: string ) {
    this.ngZone.run(() => {
      this.success.emit(response);
    });
  }

}

export interface ReCaptchaConfig {
  theme?: 'dark' | 'light';
  type?: 'audio' | 'image';
  size?: 'compact' | 'invisible' | 'normal';
  tabindex?: number;
}

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}
