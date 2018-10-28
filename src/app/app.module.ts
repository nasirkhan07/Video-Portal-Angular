import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RestEndPointService } from "./rest-endpoint.service";
import { VideoListComponent } from './video-list/video-list.component';
import { VideoComponent } from './video/video.component';
import { AppRoutingModule } from "./app-routing.module";
import { RatingComponent } from './rating/rating.component';
import { StarComponent } from './star/star.component';
import { AuthenticationService } from "app/Services/authentication.service";
import { VideoService } from "app/Services/video.service";
import { SpinnerComponent } from './spinner/spinner.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    VideoListComponent,
    VideoComponent,
    RatingComponent,
    StarComponent,
    SpinnerComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RestEndPointService, AuthenticationService,VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
