import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';

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
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
