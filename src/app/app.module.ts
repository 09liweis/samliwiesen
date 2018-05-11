import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatCardModule, MatGridListModule, MatFormFieldModule} from '@angular/material';

//import { ProjectService } from './services/project.service';
import { ExperienceService } from './services/experience.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ExperienceFormComponent } from './forms/experience-form/experience-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ExperienceFormComponent
  ],
  imports: [
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'experiences/:id',
        component: ExperienceFormComponent
      }
    ])
  ],
  providers: [
    ExperienceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
