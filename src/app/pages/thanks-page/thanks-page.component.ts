import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-thanks-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.scss']
})
export class ThanksPageComponent {

}
