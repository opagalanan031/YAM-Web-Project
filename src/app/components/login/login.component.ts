import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  authenticated = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.username === 'user' && this.password === 'pass123') {
      this.authenticated = true;
      this.router.navigate(['/dashboard']);
    }
  }
}
