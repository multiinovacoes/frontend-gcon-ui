import { UserDataService } from 'src/app/features/seguranca/user-data.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


export class NotAuthenticatedError {}


@Injectable()
export class GconHttpInterceptor implements HttpInterceptor {


  constructor(private userdataService: UserDataService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (!req.url.includes('/oauth/token') && this.userdataService.isAccessTokenInvalido()) {


      return from(this.userdataService.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {

            if (this.userdataService.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }


            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(req);
          })
        );
    }
    return next.handle(req);
  }
}
