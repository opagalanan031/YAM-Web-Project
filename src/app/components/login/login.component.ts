import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  authenticated = false;
  loginFailed = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.username + ' ' +this.password);
    if(this.username === 'user' && this.password === 'pass123') {
      this.authenticated = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }
}
