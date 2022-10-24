import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  
  members: UserDetails[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }


  reloadData() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
