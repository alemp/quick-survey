import deLocale from '@angular/common/locales/de';
import enLocale from '@angular/common/locales/en-GB';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALES } from './constants/locales';
import { registerLocaleData } from '@angular/common';

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
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: LOCALES.GERMAN },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
  ) {
    registerLocaleData(deLocale, LOCALES.GERMAN);
    registerLocaleData(enLocale, LOCALES.ENGLISH);
  }
}
