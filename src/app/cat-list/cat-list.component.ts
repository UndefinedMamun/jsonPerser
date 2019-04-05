import { BadInput } from "./../common/error-handlers/bad-input";
import { NotFoundError } from "./../common/error-handlers/not-found-error";
import { DataModel } from "./data.model";
import { CatDataService } from "./cat-data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cat-list",
  templateUrl: "./cat-list.component.html",
  styleUrls: ["./cat-list.component.sass"]
})
export class CatListComponent implements OnInit {
  constructor(private service: CatDataService) {}

  data: Array<DataModel>;
  error: String;

  ngOnInit() {
    this.service.getData().subscribe(
      (res: Array<DataModel>) => {
        this.data = res;
        // console.log(this.data);
        this.filterCats();
        this.orderByAlpha();
      },
      err => {
        if (err instanceof NotFoundError) this.error = "Json Data Not Found!";
        // else if (err instanceof BadInput) this.error = "Bad Input!";
        else {
          //500 and other errors
          this.error = "An Unexpected error occured!";
          throw err;
        }
      }
    );
  }

  orderByAlpha() {
    let sortedData = this.data.map(item => {
      if (!item.pets) return item;

      item.pets.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 1;
      });
      // console.log(item.pets);
      return item;
    });
    this.data = sortedData;
  }

  filterCats() {
    this.data = this.data.map(item => {
      if (!item.pets) return item;

      item.pets = item.pets.filter(pet => pet.type === "Cat");
      return item;
    });
  }
}
