import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
