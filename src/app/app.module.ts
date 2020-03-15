import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TinymceModule } from 'angular2-tinymce';
// import { EditorModule } from '@tinymce/tinymce-angular';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import {MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';

//import { ProjectService } from './services/project.service';
import { ExperienceService } from './services/experience.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ExperienceFormComponent } from './forms/experience-form/experience-form.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { BlogFormComponent } from './forms/blog-form/blog-form.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ExperienceFormComponent,
    PageListComponent,
    ProjectFormComponent,
    BlogFormComponent,
    GalleryComponent
  ],
  imports: [
    // EditorModule,
    TinymceModule.withConfig({skin_url: '/assets/skins/lightgray'}),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'samliweisen' } as CloudinaryConfiguration),
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
        path: ':page',
        component: PageListComponent
      },
      {
        path: 'experiences/:id',
        component: ExperienceFormComponent
      },
      {
        path: 'projects/:id',
        component: ProjectFormComponent
      },
      {
        path: 'blogs/:id',
        component: BlogFormComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      }
    ], { useHash: true })
  ],
  providers: [
    ExperienceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
