import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Message } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private MSG_BASE_URL = 'http://localhost:8080/message';

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  sendMessage(msgText: string, sender: string): Observable<Message> {
    return this.httpClient.post<Message>(this.MSG_BASE_URL + '/send-message', {msgText, sender}, this.postHeader)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => new Error(error.error.message));
  }
}
