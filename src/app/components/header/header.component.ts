import {Component, OnInit} from '@angular/core';
import {HeaderLinks} from '../../models/header-links.model';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navExpanded = false;
  // TODO: add to cms
  navItems: HeaderLinks[] = [
    new HeaderLinks({en: 'Projects', fr: 'Projets', ur: 'منصوبے'}, '', 'projects', null, null),
    new HeaderLinks({en: 'Tech Tips', fr: 'Conseils Techniques', ur: 'ٹیک تجاویز'}, '', '', 'modal', '#inactiveLinkModal'),
    new HeaderLinks({en: 'Blog', fr: 'Blog', ur: 'بلاگ'}, '', '', 'modal', '#inactiveLinkModal'),
    new HeaderLinks({en: 'About', fr: 'Sur', ur: 'میرے متعلق'}, '', '', 'modal', '#inactiveLinkModal'),
    new HeaderLinks({en: 'Contact', fr: 'Contact', ur: 'رابطہ'}, '', 'contact', null, null),
    // new HeaderLinks({en: 'Signup', fr: 'S\'inscrire', ur: 'سائن اپ'}, '', ''),
  ];
  allLangs: string[] = ['en', 'fr', 'ur'];
  onUrdu: boolean;
  onFrench: boolean;
  show = false;
  collapsing = false;

  constructor(public helper: HelperService) {
  }

  ngOnInit() {
    let langs = this.helper.langCheck(this.helper.currentLang);
    this.onFrench = langs.fr;
    this.onUrdu = langs.ur;
    this.helper.langChange.subscribe(
      (lang) => {
        langs = this.helper.langCheck(lang.toString());
        this.onFrench = langs.fr;
        this.onUrdu = langs.ur;
      }
    );
  }

  navTransition() {
    setTimeout(() => {
      this.show = !this.show;
      this.navExpanded = !this.navExpanded;
    }, 150);
  }

  langDropDownList() {
    return this.allLangs.filter((lang) => {
      return lang !== this.helper.currentLang;
    });
  }

  switchLang(lang: string) {
    this.helper.useLang(lang);
    this.helper.langChange.next(lang);
  }

  onOutsideFocus() {
    if (this.show === true) {
      this.collapsing = true;
      this.show = false;
      this.navExpanded = false;
      setTimeout(() => {
        this.collapsing = false;
      }, 1000);
    }
  }
}
