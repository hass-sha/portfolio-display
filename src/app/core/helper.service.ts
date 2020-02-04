import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private readonly _onUrdu: boolean;
  private readonly _onFrench: boolean;
  langChange = new Subject();
  baseUrl: string;

  constructor(private translate: TranslateService) {
    if (translate.currentLang === 'ur') {
      this._onUrdu = true;
      this._onFrench = false;
    } else if (translate.currentLang === 'fr') {
      this._onFrench = true;
      this._onUrdu = false;
    }
  }

  get onUrdu(): boolean {
    return this._onUrdu;
  }

  get onFrench(): boolean {
    return this._onFrench;
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  useLang(lang: string) {
    this.translate.use(lang);
  }

  getTranslatedData(data: { en?: string; fr?: string; ur?: string } | { en?: string[]; fr?: string[]; ur?: string[] }) {
    if (data[this.translate.currentLang]) {
      return data[this.translate.currentLang];
    }
    return data[this.translate.defaultLang];
  }

  initConfig() {
    environment.urls.baseUrl = window.location.origin;
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur/) ? browserLang : 'en');
    this.langChange.next(this.translate.currentLang);
    this.baseUrl = window.location.origin;
  }

  langCheck(lang: string) {
    let onFrench: boolean, onUrdu: boolean;
    if (lang === 'fr') {
      onFrench = true;
      onUrdu = false;
    } else if (lang === 'ur') {
      onFrench = false;
      onUrdu = true;
    } else {
      onUrdu = false;
      onFrench = false;
    }
    return {fr: onFrench, ur: onUrdu};
  }
}
