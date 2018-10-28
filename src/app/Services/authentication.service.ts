import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { RestEndPointService } from "../rest-endpoint.service";
import { Subject } from "rxjs/Subject";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private apiService: RestEndPointService) { }

  public loginStateChanged = new Subject();
  private isLoggedIn = false;
  private userCreds = null;
  
  /**
   * isUserLogged in getter
   * 
   * @readonly
   * @memberof AuthenticationService
   */
  get isLogged() {
    return this.isLoggedIn;
  }

  /**
   * isUserLogged in setter
   * 
   * @memberof AuthenticationService
   */
  set isLogged(value: boolean) {
    this.isLoggedIn = true;
  }

  /**
   * Login user http api
   * 
   * @memberof AuthenticationService
   */
  login = (credentials) => {
    this.userCreds = credentials;
    return this.http.post(this.apiService.login, credentials);
  }

  /**
   * Logout user http api
   * 
   * @memberof AuthenticationService
   */
  logout = () => {
    if (!!Cookie.get('sessionId')) {
      return this.http.get(this.apiService.logout);
    }
  }

  /**
   * http api for creating new user
   * 
   * @memberof AuthenticationService
   */
  createAccount=(creds)=>{
    return this.http.post(this.apiService.newUser,creds);
  }
}
