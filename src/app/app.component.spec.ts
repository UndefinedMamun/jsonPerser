import { CatDataService } from "./cat-list/cat-data.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CatListComponent } from "./cat-list/cat-list.component";
import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AppComponent, CatListComponent],
      providers: [CatDataService]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
