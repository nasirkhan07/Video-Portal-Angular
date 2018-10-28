import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from "@angular/http";
import { RestEndPointService } from ".././rest-endpoint.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/Services/authentication.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  constructor(private apiService: RestEndPointService, private router: Router, private authService: AuthenticationService) { }

  private obsCancel= new Subject<boolean>(); 
  userCreds = {
    username: null,
    password: null
  }
  ngOnInit() {
  }
  loginErrMsg = null;

  /**
   * User Login Api
   * 
   * @memberof UserLoginComponent
   */
  login = () => {
    this.authService.login(this.userCreds).takeUntil(this.obsCancel).subscribe(
      (res: any) => {
        if (!!(JSON.parse(res._body).error)) {
          this.loginErrMsg = JSON.parse(res._body).error;
          return;
        }
        if (!!res && !!res._body && !!(JSON.parse(res._body).sessionId)) {
          this.loginErrMsg = null;
          Cookie.set('sessionId', JSON.parse(res._body).sessionId);
          Cookie.set('user', JSON.parse(res._body).username);
          
          this.apiService.updateSessionId = JSON.parse(res._body).sessionId;
          this.authService.isLogged = true;
          this.authService.loginStateChanged.next({success:true, user:JSON.parse(res._body).username});
          this.router.navigate(['/videos']);
        }
      },
      (err) => {
      }
    )
  }
  ngOnDestroy(){
    this.obsCancel.next(true);
    this.obsCancel.complete();
    this.obsCancel.unsubscribe();
  }

}
