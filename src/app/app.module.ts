import { CatDataService } from "./cat-list/cat-data.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { CatListComponent } from "./cat-list/cat-list.component";

@NgModule({
  declarations: [AppComponent, CatListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
