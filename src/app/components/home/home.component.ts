import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectImage} from '../../models/project-image.model';
import {Services} from '../../models/services.model';
import {IconInfo} from '../../models/icon-info.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message.model';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HelperService} from '../../core/helper.service';
import {take} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ReCaptchaConfig} from '../../directives/ng-recaptcha/ng-recaptcha.directive';
import {NgRecaptchaService} from '../../services/ng-recaptcha.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  // TODO: Move to cms
  projectThumb: ProjectImage[] = [
    new ProjectImage({
      en: 'Recipe Book',
      ur: 'ریسِپی بک'
    }, '../../../assets/images/projects/1.jpg', {
      en: 'RecipeBook Application',
      fr: 'Application RecipeBook',
      ur: 'ریسِپی بک ایپلیکیشن'
    }, {en: 'Angular 7 | Firebase | NgRx', ur: 'اینگیولر ٧ | فائر بیس | این جی آر ایکس'}),
    new ProjectImage({
      en: 'Smart Factory Dashboard',
      ur: 'سمارٹ فیکٹری ڈیش بورڈ'
    }, '../../../assets/images/projects/2.jpg', {
      en: 'Dashboard to control different aspects of a smart factory',
      fr: 'Tableau de bord pour contrôler différents aspects d\'une usine intelligente',
      ur: 'سمارٹ فیکٹری کے مختلف پہلوؤں کو کنٹرول کرنے کے لئے ڈیش بورڈ'
    }, {en: 'AngularJS 1.6 | MQTT | MEAN Stack', ur: 'اینگیولر جے ایس ١.٦ | ایم کیو ٹی ٹی | میٖن اسٹیک'}),
    new ProjectImage({
      en: 'Trivia Flow',
      ur: 'ٹرِویا فلو'
    }, '../../../assets/images/projects/3.jpg', {
      en: 'Trivia Game Application',
      fr: 'Application de jeu de questions',
      ur: 'ٹریویا گیم ایپلی کیشنز'
    }, {
      en: 'Angular 6 | Firebase',
      ur: 'اینگیولر ٦ | فائر بیس'
    })
  ];

  // TODO: Move to cms
  services: Services[] = [
    new Services('desktop_windows', {
        en: 'Design modern and state of the art pages.',
        fr: 'Concevoir des pages modernes et à la pointe de la technologie.',
        ur: 'جدید ترین انداز کی ویب سائٹس'
      }, {en: 'UI Design', fr: 'Conception D\'interface Utilisateur', ur: ' یو آئی ڈیزائن'},
      {
        en: 'Designer Tools:',
        fr: 'Outils de designer',
        ur: 'ڈیزائن کے اوزار'
      }, {
        en: ['Pen & Paper', 'Adobe Photoshop', 'Sketch', 'Zeplin', '...'],
        fr: ['Stylo et papier', 'Adobe Photoshop', 'Sketch', 'Zeplin', '...'],
        ur: ['قلم اور کاغذ', 'اڈوب فوٹوشاپ', 'سکیچ', 'زپلین', '...']
      }),
    new Services('web', {
        en: 'Create dynamic web applications from scratch.',
        fr: 'Créez des applications Web dynamiques à partir de zéro.',
        ur: 'اول سے آخر تک متحرک اور فعال ویب ایپلیکیشنز'
      }, {en: 'Front-End Dev', fr: 'Développeur frontal', ur: 'فرنٹ اینڈ ڈویلپر'},
      {en: 'Dev Tools:', fr: 'Outils de Développement', ur: 'ڈویلپر ٹولز'}, {
        en: ['WebStorm', 'GitHub', 'Bootstrap', 'Terminal', '...'],
        ur: ['ویب اسٹارم', 'گٹ ہب', 'بوٹسٹریپ', 'ٹرمینل', '...']
      }),
    new Services('code', {
        en: 'Create robust server-side applications to support front-end',
        fr: 'Créez des applications côté serveur robustes pour prendre en charge l\'interface frontale',
        ur: 'فرنٹ اینڈ ایپلیکیشنز کو سہارا دینے کیلئے مضبوط سرور سائڈ سسٹمز کی تشکیل '
      }, {
        en: 'Server-Side Dev',
        fr: 'Dev Côté Serveur',
        ur: 'سرور سائڈ ڈیولپر'
      },
      {en: 'Dev Tools:', fr: 'Outils de Développement', ur: 'ڈویلپر ٹولز'}, {
        en: ['IntelliJ', 'Loadash', 'Express', 'Terminal', '...'],
        ur: ['انٹیلی جے', 'لوڈیش', 'ایکسپریس', 'ٹرمینل', '...']
      }),
  ];

  // TODO: Move to cms
  icons: IconInfo[] = [
    new IconInfo('facebook', 'https://www.facebook.com/hassan.shah609'),
    new IconInfo('github', 'https://github.com/m-hassan53'),
    new IconInfo('instagram', 'https://www.instagram.com/hass_sha'),
    new IconInfo('linkedin', 'https://linkedin.com/in/mhassan984'),
    new IconInfo('twitter', 'https://twitter.com/iamMMHassan'),
    new IconInfo('youtube', 'https://youtube.com/channel/UCAPFdDMxm_NgJOr_TCD5wxg'),
  ];

  private iconsDir = 'assets/images/icons/';
  contactForm: FormGroup;
  onUrdu: boolean;
  onFrench: boolean;
  mailSent: boolean;
  recaptchaStatus = false;
  siteKey: string;
  closeContactModal = new Subject<boolean>();
  recaptcahConf: ReCaptchaConfig = {
    theme: 'dark',
    size: 'invisible'
  };

  @ViewChild('contactModal') contactModal: ElementRef;

  constructor(private http: HttpClient, public helper: HelperService, public recaptchaService: NgRecaptchaService) {
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

    this.contactForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'subject': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    });

    this.siteKey = environment.recaptchaSiteKey;
  }

  getIcon(iconName: string): { 'background': string } {
    return {'background': 'url(' + this.iconsDir + iconName + '.png) no-repeat'};
  }

  sendEmail(token: string) {
    this.mailSent = true;
    const subjectPrefix = 'MH-Zone: ';
    const message = new Message(
      environment.toEmail,
      {
        email: this.contactForm.value.email,
        name: this.contactForm.value.firstName + ' ' + this.contactForm.value.lastName
      },
      subjectPrefix + this.contactForm.value.subject,
      this.contactForm.value.message
    );
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Recaptcha-Token': token});
    this.http.post(this.helper.baseUrl + environment.urls.emailApi, message, {headers: headers}).pipe(take(1)).subscribe((response) => {
      console.log('server-pass: ', response);
      this.closeContactModal.next(true);
      this.onCloseContactModal();
    }, (err) => {
        console.error('server-fail: ', err);
      this.recaptchaService.reset();
    });
  }

  validateUser() {
    this.recaptchaService.execute();
  }

  recaptchaExpired() {
    console.error('recaptcha expired. please try again.');
    this.recaptchaService.reset();
  }

  // TODO Add error scenarios for contact modal

  onCloseContactModal() {
    this.contactForm.reset();
    this.recaptchaStatus = false;
    this.closeContactModal.next(false);
  }

  recaptchaResolved(response) {
    this.sendEmail(response);
  }

  triggerRecaptcha() {
    this.recaptchaStatus = !this.recaptchaStatus;
  }

  onModalClose() {
    setTimeout(() => {
      if (this.recaptchaStatus === true && this.contactModal.nativeElement.className === 'modal fade') {
        this.recaptchaStatus = false;
      }
    }, 900);
  }

  getLanguage(): string {
    return this.helper.currentLang;
  }
}
