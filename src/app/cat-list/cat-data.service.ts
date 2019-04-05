import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CatDataService {
  public jsonDataUri = "/assets/data.json";

  constructor(private http: HttpClient) {}

  public getData() {
    return this.http.get(this.jsonDataUri);
  }
}
