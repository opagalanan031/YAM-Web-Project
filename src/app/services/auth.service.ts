import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL = 'http://localhost:8080/user/login';
  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post(this.AUTH_URL, {username, password}, this.postHeader);
  }
}
