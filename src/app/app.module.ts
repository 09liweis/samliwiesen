import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatCardModule, MatGridListModule} from '@angular/material';

//import { ProjectService } from './services/project.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    MatCardModule,
    MatGridListModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      }
    ])
  ],
  providers: [
    //ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
