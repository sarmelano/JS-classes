class Person {
  constructor(fullname) {
    this.fullname = fullname;
  }

  showInfo() {
    console.log(`Resident: ` + this.fullname);
  }
}

class Apartment {
  constructor(number, roomsAmount, residents) {
    this.number = number;
    this.roomsAmount = roomsAmount;
    this.residents = residents;
  }

  showInfo() {
    console.log(`
    Apt. #: ${this.number}
    Rooms: ${this.roomsAmount}
    Residents: 
    `);

    this.residents.forEach(person => person.showInfo());
  }
}

class House {
  constructor(address, floors, apartments) {
    this.address = address;
    this.floors = floors;
    this.apartments = apartments;
  }

  showInfo() {
    console.log(`
    Address: ${this.address}
    Floors: ${this.floors}
    Apartments: 
    `);

    this.apartments.forEach(app => app.showInfo());
  }
}