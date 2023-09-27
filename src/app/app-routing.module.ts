import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';
import { ThanksPageComponent } from './pages/thanks-page/thanks-page.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyPageComponent,
  },
  {
    path: 'thanks',
    component: ThanksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
