import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
  ],
  providers: [
    MatIconRegistry,
  ],
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
})
export class LanguagePickerComponent {
  matIconRegistry = inject(MatIconRegistry);
  domSanitizer = inject(DomSanitizer);
  translateService = inject(TranslateService);

  constructor() {
    this.matIconRegistry.addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/de.svg'));
    this.matIconRegistry.addSvgIcon('gb', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/gb.svg'));
  }

  selectLanguage(language: string) {
    this.translateService.use(language);
  }

  getFlag() {
    const language = this.translateService.currentLang;
    if (language === 'de-DE') {
      return 'de';
    }

    return 'gb';
  }
}
