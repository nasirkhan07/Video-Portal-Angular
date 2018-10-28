import { Component, OnInit } from '@angular/core';
import { RestEndPointService } from "app/rest-endpoint.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/Services/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: RestEndPointService, private router: Router, private authService: AuthenticationService) { }

  userCreds = {
    username: null,
    password: null
  }
  ngOnInit() {
  }

  signup() {
    if (!!this.userCreds.username && !!this.userCreds.password) {
      this.authService.createAccount(this.userCreds).subscribe(res => {
        if (res.status == 200) {
          alert('User created successfully, Please login');
          this.router.navigate(['/login']);
        }

      })
    }
  }

}
