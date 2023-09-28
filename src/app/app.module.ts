import deLocale from '@angular/common/locales/de';
import enLocale from '@angular/common/locales/en-GB';
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALES } from './constants/locales';
import { registerLocaleData } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ApiUrlInterceptor } from './interceptor/interceptor';
import { EnvironmentService } from './services/environment.service';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory,
      },

    }),
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: LOCALES.GERMAN },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  translateService = inject(TranslateService);
  environmentService = inject(EnvironmentService);

  constructor() {
    registerLocaleData(deLocale, LOCALES.GERMAN);
    registerLocaleData(enLocale, LOCALES.ENGLISH);

    this.environmentService.load();

    this.translateService.use(LOCALES.GERMAN);
  }
}
