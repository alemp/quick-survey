import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../services/survey.service';
import { FeedbackDto } from '../../dtos/feedback.dto';
import { Router } from '@angular/router';

interface FeedbackForm {
  score: FormControl<number>;
  details: FormControl<string | null>;
}

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent implements OnInit {
  form: FormGroup<FeedbackForm> | undefined;

  fb = inject(FormBuilder);
  service = inject(SurveyService);
  router = inject(Router);

  ngOnInit() {
    this.form = this.fb.group<FeedbackForm>(<FeedbackForm>{
      score: new FormControl<number>(0, {
        validators: [
          Validators.required,
        ],
      }),
      details: new FormControl<string | null>(null),
    });
  }

  setRating(value: number) {
    this.form?.controls.score.setValue(value);
  }

  submit() {
    this.form?.markAsDirty();
    this.form?.markAsTouched();

    if (this.form?.valid) {
      const data: FeedbackDto = {
        ...this.form.getRawValue(),
        metadata: {
          test: 'aaa',
        },
      };
      this.service.saveSurvey(data).subscribe(async data => {
        if (data) {
          await this.router.navigate(['/', 'thanks']);
        }
      });
    }
  }

  // TODO: read query params and store in an object
}
