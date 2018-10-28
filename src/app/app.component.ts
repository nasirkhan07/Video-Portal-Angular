import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from "app/Services/authentication.service";
import { RestEndPointService } from "app/rest-endpoint.service";
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authServ: AuthenticationService, private apiService: RestEndPointService, private router: Router) {
  }

  //subject for use in takeuntil oeprator for auto unsubscription of observable source
  private obsCancel = new Subject<boolean>();
  loginText = 'Login';
  loginLink = "/login";
  userName;
  ngOnInit() {
    //on Login/Logout the loginmenu text change
    this.authServ.loginStateChanged.takeUntil(this.obsCancel).subscribe((val: any) => {
      if (!!val.success) {
        this.loginText = "Logout"
        setTimeout(() => {
          this.userName = val.user;
        }, 300);
      }
      else {
        this.loginText = "Login"
      }
    })
    if (!!Cookie.get('sessionId')) {
      this.loginText = "Logout"
    }
  }

  /**
   * LogOut User
   * 
   * @memberof AppComponent
   */
  loginout() {
    if (this.loginText == 'Logout') {
      this.authServ.logout().takeUntil(this.obsCancel).subscribe(res => {
        this.apiService.resetSessionId = null;
        Cookie.set('sessionId', null);
        Cookie.set('user', null);
        this.userName = null;

        this.authServ.isLogged = false;
        this.loginText = "Login"
        this.router.navigate([this.loginLink]);
      })
    }
    else {
      this.router.navigate([this.loginLink]);
    }
  }


  ngOnDestroy() {
    this.obsCancel.next(true);
    this.obsCancel.complete();
    this.obsCancel.unsubscribe();
  }

}
