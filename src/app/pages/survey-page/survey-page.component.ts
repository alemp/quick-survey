import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogoComponent } from '../../components/logo/logo.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../services/survey.service';
import { FeedbackDto } from '../../dtos/feedback.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, take } from 'rxjs';
import { LanguagePickerComponent } from '../../components/language-picker/language-picker.component';
import { v4 as uuidv4 } from 'uuid';
import { MatExpansionModule } from '@angular/material/expansion';

interface FeedbackControls {
  score: FormControl<number>;
  details: FormControl<string | null>;
}

interface FeedbackForm {
  questions: FormArray<FormGroup<FeedbackControls>>;
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
    LanguagePickerComponent,
    MatExpansionModule,
  ],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent implements OnInit {
  fb = inject(FormBuilder);
  service = inject(SurveyService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  translationService = inject(TranslateService);

  form: FormGroup<FeedbackForm> | undefined;
  metadata: { [key: string]: string } | undefined;
  loading = false;
  feedbackTypes = [
    'overall',
    'punctuality',
    'communication',
    'professionalism',
  ];

  ngOnInit() {
    this.createForm();
    this.subscribeToQueryParams();
  }

  createFormGroup(): FormGroup<FeedbackControls> {
    return this.fb.group({
      score: new FormControl<number>(0, {
        nonNullable: true,
        validators: [
          Validators.required,
        ],
      }),
      details: new FormControl<string | null>(null),
    });
  }

  createForm() {
    this.form = this.fb.group<FeedbackForm>(<FeedbackForm>{
      questions: this.fb.array<FormGroup<FeedbackControls>>([
        this.createFormGroup(),
        this.createFormGroup(),
        this.createFormGroup(),
        this.createFormGroup(),
      ]),
    });
  }

  subscribeToQueryParams() {
    this.activatedRoute.queryParams.pipe(
      take(1),
    ).subscribe(async (queryParams) => {
      const language = queryParams['language'];

      if (language) {
        this.translationService.use(language);
      }

      this.metadata = {
        ...queryParams,
        uuid: uuidv4(),
      };
    });
  }

  setRating(index: number, value: number) {
    this.form?.controls.questions.at(index)?.controls.score.setValue(value);
  }

  submit() {
    this.form?.markAsDirty();
    this.form?.markAsTouched();

    if (this.form?.valid) {

      this.loading = true;
      const requests = [];

      for (let i = 0; i < this.form.controls.questions.controls.length; i++) {
        if (this.form.controls.questions.at(i).controls.score.value !== 0) {
          const data: FeedbackDto = {
            ...this.form.controls.questions.at(i).getRawValue(),
            metadata: {
              ...this.metadata!,
              type: this.feedbackTypes[i],
            },
          };

          requests.push(this.service.saveSurvey(data).pipe(
            take(1),
          ));
        }
      }

      forkJoin(requests).pipe(
        finalize(() => this.loading = false),
      ).subscribe(async data => {
        if (data) {
          await this.router.navigate(['/', 'thanks']);
        }
      });
    }
  }
}
