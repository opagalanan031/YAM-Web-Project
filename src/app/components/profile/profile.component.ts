import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  userId!: number;

  constructor(
    private tokenStorageService: TokenStorageService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

}
