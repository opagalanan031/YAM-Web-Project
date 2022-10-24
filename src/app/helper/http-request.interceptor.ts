import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegularGuard } from '../guards/regular.guard';
import { CoreGuard } from '../guards/core.guard';
import { AnyMemberGuard } from '../guards/any-member.guard';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    })
    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, userClass: HttpRequestInterceptor, multi: true 
  },
  RegularGuard,
  CoreGuard,
  AnyMemberGuard
];
