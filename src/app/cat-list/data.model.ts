export interface Pet {
  name: String;
  type: String;
}

export interface DataModel {
  name: String;
  gender: String;
  age: Number;
  pets: Array<Pet>;
}
