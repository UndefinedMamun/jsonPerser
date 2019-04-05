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

  it("should get the json data", () => {
    const service: CatDataService = TestBed.get(CatDataService);

    service.getData().subscribe(res => {
      expect(res).toBeTruthy();
    });
  });

  it("should throw error if jsonDataUri is wrong.", () => {
    const service: CatDataService = TestBed.get(CatDataService);
    service.jsonDataUri = "false/uri";
    service.getData().subscribe(
      res => {
        // expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeTruthy();
      }
    );
  });
});
