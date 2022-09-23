import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.loggedIn()) {
      this.authenticated = true;
      this.roles = this.tokenStorageService.getUser().roles;

      this.navigate();
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.tokenStorageService.saveUser(data);
        this.authenticated = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.success();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loginFailed = true;
      }
    });
  }

  success() {
    window.location.reload();
  }
 
  navigate() {
    if(this.roles.includes('REGULAR_USER')) {
      this.router.navigateByUrl('/dashboard');
    } else if(this.roles.includes('CORE_MEMBER')) {
      this.router.navigateByUrl('/core-dashboard');
    } else {
      this.errorMessage = 'Invalid role';
      this.tokenStorageService.clear();
      window.location.reload();
    }
  }
}
