import { CatDataService } from "./cat-data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cat-list",
  templateUrl: "./cat-list.component.html",
  styleUrls: ["./cat-list.component.sass"]
})
export class CatListComponent implements OnInit {
  constructor(private service: CatDataService) {}

  data: Array<any>;

  ngOnInit() {
    this.service.getData().subscribe(
      (res: Array<any>) => {
        this.data = res;
        // console.log(this.data);
        this.filterCats();
        this.orderByAlpha();
      },
      err => {
        // console.log(err);
        if (err.status == 404) return alert("json Data not found!");
        alert("something went wrong while fetching the json data!");
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
