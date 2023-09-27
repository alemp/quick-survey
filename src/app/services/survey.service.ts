import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeedbackDto} from "../dtos/feedback.dto";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private readonly httpClient: HttpClient) {
  }


  saveSurvey() {

    let survey = {
      detail: "test",
      score: 1,
      metadata: {
        'Name': 'rHENUSO HI TEX',
        'Client': 'Im Client',
      }
    } as FeedbackDto;

    this.httpClient.post('feedback', survey, { observe: 'response' }).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log(res);
        }
      }, (err) => {
        alert("There was a problem with your survey");
      });
}
}
