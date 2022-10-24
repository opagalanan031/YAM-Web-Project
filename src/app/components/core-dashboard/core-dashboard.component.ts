import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-core-dashboard',
  templateUrl: './core-dashboard.component.html',
  styleUrls: ['./core-dashboard.component.css']
})
export class CoreDashboardComponent implements OnInit {

  name = '';

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.name = this.tokenStorageService.getUser().firstName;
  }

}
