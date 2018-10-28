import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';
import { ErrorResponse } from '../_models';
import { MessageResource } from '../_core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let errorMessage: string;

            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
                return;
            } else if (err.status === 0) {
                errorMessage = MessageResource.UNAVAILABLE_SERIVE;
            } else {
                const errorResponse: ErrorResponse = err.error as ErrorResponse;
                if (errorResponse && errorResponse.errors)
                    errorMessage = errorResponse.errors[0];
                else
                    errorMessage = err.statusText;
            }

            this.alertService.error(errorMessage);
            return throwError(errorMessage);
        }))
    }
}