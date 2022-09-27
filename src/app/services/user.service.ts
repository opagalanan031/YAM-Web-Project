import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER_BASE_URL = 'http://localhost:8080/user';

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(
      this.USER_BASE_URL + '/register',
      user,
      this.postHeader)
      .pipe(catchError(this.errorHandler));;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.USER_BASE_URL + '/get-all-users')
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.USER_BASE_URL + '/get-user/' + id)
      .pipe(catchError(this.errorHandler));
  }

  updateDetails(user: User): Observable<any> {
    return this.httpClient.put<User>(this.USER_BASE_URL + '/update-details/' + user.id, user)
      .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.USER_BASE_URL + '/delete-user/' + id)
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
