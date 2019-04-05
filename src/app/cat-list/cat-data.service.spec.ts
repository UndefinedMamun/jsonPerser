import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { CatDataService } from "./cat-data.service";

describe("CatDataService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    })
  );

  it("should be created", () => {
    const service: CatDataService = TestBed.get(CatDataService);
    expect(service).toBeTruthy();
  });

  it("should get json data in correct format", async done => {
    const service: CatDataService = TestBed.get(CatDataService);

    service.getData().subscribe(res => {
      (res as Array<any>).forEach(element => {
        expect(
          element.hasOwnProperty("gender") && element.hasOwnProperty("pets")
        ).toEqual(true);
      });
      done();
    });
  });

  it("should throw error if jsonDataUri is wrong.", async done => {
    const service: CatDataService = TestBed.get(CatDataService);
    service.jsonDataUri = "false/uri.json";
    service.getData().subscribe(
      res => {
        // expect(res).toBeTruthy();
      },
      err => {
        // console.log(err);
        expect(err.status).toBe(404);
        done();
      }
    );
  });
});
