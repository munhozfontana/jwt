import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new Login(null, null, null, null, null);
  returnUrl: String;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
      // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(form) {
    console.log(form.value);
    if (!form.invalid) {
      this.authenticationService.login(form.value.username, form.value.password).subscribe(
        res => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
