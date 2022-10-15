import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/models';
import { MessageService } from 'src/app/services/message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  message = '';
  username = '';
  errorMessage = '';

  constructor(
      private messageService: MessageService,
      private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
  }

  sendMessage() {
    this.errorMessage = '';

    console.log(this.message);
    console.log(this.username);

    if(!this.message) {
      this.errorMessage = 'Please enter a message';
    } else {
      this.messageService.sendMessage(this.message, this.username).subscribe({
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  reload() {
    window.location.reload();
  }

}
