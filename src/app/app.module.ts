import { AppErrorHandler } from "./common/error-handlers/app-error-handler";
import { CatDataService } from "./cat-list/cat-data.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { CatListComponent } from "./cat-list/cat-list.component";
import { HttpConfigInterceptor } from "./common/HttpInterceptor";

@NgModule({
  declarations: [AppComponent, CatListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
