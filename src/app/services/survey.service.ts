import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedbackDto } from '../dtos/feedback.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  httpClient = inject(HttpClient);

  saveSurvey(data: FeedbackDto): Observable<FeedbackDto | null> {
    return this.httpClient.post<FeedbackDto>('feedback', data, { observe: 'response' }).pipe(
      map(res => res.body),
    );
  }
}
