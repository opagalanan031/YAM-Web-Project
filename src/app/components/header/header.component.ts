import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticated = false;
  name?: string;
  roles: string[] = [];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.loggedIn()) {
      this.authenticated = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.name = user.firstName;
    }
  }

  logout() {
    this.tokenStorageService.clear();
    this.authenticated = false;
    // window.location.reload();
  }

}
