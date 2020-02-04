import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import {ClickOutsideModule} from 'ng4-click-outside';
import {HelperService} from './core/helper.service';
import { FooterComponent } from './components/footer/footer.component';
import { ForceClickDirective } from './directives/force-click/force-click.directive';
import { AttachModalDirective } from './directives/attach-modal/attach-modal.directive';
import { ReverseOnUrduPipe } from './pipes/reverse-on-urdu/reverse-on-urdu.pipe';
import { ScrollToDirective } from './directives/scroll-to/scroll-to.directive';
import { NgRecaptchaDirective } from './directives/ng-recaptcha/ng-recaptcha.directive';
import { RequiredDataCheckDirective } from './directives/required-data-check/required-data-check.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ForceClickDirective,
    AttachModalDirective,
    ReverseOnUrduPipe,
    ScrollToDirective,
    NgRecaptchaDirective,
    RequiredDataCheckDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [TranslateService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT (Ahead-of-Time) compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
