import { BadInput } from "./error-handlers/bad-input";
import { Status } from "./status.enum";
import { AppError } from "./error-handlers/app-error";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { NotFoundError } from "./error-handlers/not-found-error";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("token");

    // if (token) {
    //   request = request.clone({
    //     headers: request.headers.set("Authorization", "Bearer " + token)
    //   });
    // }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
        //   console.log("event--->>>", event);
        // }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status === Status.notFound)
          return throwError(new NotFoundError(error));

        if (error.status === Status.badRequest)
          return throwError(new BadInput(error));

        // if (error.status === Status.serverError)
        //   return throwError(new AppError(error));

        return throwError(new AppError(error));
      })
    );
  }
}
