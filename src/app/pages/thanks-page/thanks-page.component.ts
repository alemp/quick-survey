import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-thanks-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, LogoComponent],
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.scss'],
})
export class ThanksPageComponent {

}
