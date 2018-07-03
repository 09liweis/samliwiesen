import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TinymceModule } from 'angular2-tinymce';

import {MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';

//import { ProjectService } from './services/project.service';
import { ExperienceService } from './services/experience.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ExperienceFormComponent } from './forms/experience-form/experience-form.component';
import { ExperienceListComponent } from './pages/experience-list/experience-list.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { BlogFormComponent } from './forms/blog-form/blog-form.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ExperienceFormComponent,
    ExperienceListComponent,
    ProjectListComponent,
    ProjectFormComponent,
    BlogFormComponent,
    BlogListComponent,
    GalleryComponent
  ],
  imports: [
    TinymceModule.withConfig({
      skin_url: '/assets/skins/lightgray'
    }),
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
        path: 'experiences',
        component: ExperienceListComponent
      },
      {
        path: 'experience/:id',
        component: ExperienceFormComponent
      },
      {
        path: 'projects',
        component: ProjectListComponent
      },
      {
        path: 'project/:id',
        component: ProjectFormComponent
      },
      {
        path: 'blogs',
        component: BlogListComponent
      },
      {
        path: 'blog/:id',
        component: BlogFormComponent
      }
    ])
  ],
  providers: [
    ExperienceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
