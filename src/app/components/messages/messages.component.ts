import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/models';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  messages: Message[] = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
