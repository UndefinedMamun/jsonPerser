import { HttpClientModule } from "@angular/common/http";
import { CatDataService } from "./cat-data.service";
import { Observable } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CatListComponent } from "./cat-list.component";
import { By } from "@angular/platform-browser";

describe("CatListComponent", () => {
  let component: CatListComponent;
  let fixture: ComponentFixture<CatListComponent>;
  let data = [
    {
      name: "Fred",
      gender: "Male",
      age: 40,
      pets: [
        { name: "Tom", type: "Cat" },
        { name: "Max", type: "Cat" },
        { name: "Sam", type: "Dog" },
        { name: "Jim", type: "Cat" }
      ]
    },

    {
      name: "Samantha",
      gender: "Female",
      age: 40,
      pets: [{ name: "Tabby", type: "Cat" }]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CatListComponent],
      providers: [CatDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatListComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    let service = TestBed.get(CatDataService);
    spyOn(service, "getData").and.returnValue(
      Observable.create(observer => {
        observer.next(data);
      })
    );

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should Filter pets data to only cats", () => {
    component.data = [
      {
        name: "Fred",
        gender: "Male",
        age: 40,
        pets: [
          { name: "Tom", type: "Cat" },
          { name: "Max", type: "Cat" },
          { name: "Sam", type: "Dog" },
          { name: "Jim", type: "Cat" }
        ]
      }
    ];

    component.filterCats();
    const pets = component.data[0].pets;
    expect(pets[pets.length - 1].name).toBe("Jim");
  });

  it("should sort pets data alphabetically according to name", () => {
    component.data = [
      {
        name: "Fred",
        gender: "Male",
        age: 40,
        pets: [
          { name: "Tom", type: "Cat" },
          { name: "Max", type: "Cat" },
          { name: "Sam", type: "Dog" },
          { name: "Jim", type: "Cat" }
        ]
      }
    ];

    component.orderByAlpha();
    const pets = component.data[0].pets;
    expect(pets[0].name).toBe("Jim");
  });

  it("should render all Data correctly", () => {
    component.data = data;

    fixture.detectChanges();

    let des = fixture.debugElement.queryAll(By.css(".owner"));
    console.log(des);

    expect(des.length).toBe(data.length);
  });
});
