const people1 = [
  new Person(`John Smith`),
];

const people2 = [
  new Person(`John Doe`),
  new Person(`Kate Doe`),
];

const people3 = [
  new Person(`Nick Slimmer`),
  new Person(`Annet Slimmer`),
  new Person(`Silly Slimmer`),
];

const appartments = [
  new Appartment(101, 1, people1), //номер апт, кол-во комнат, семья
  new Appartment(102, 1, people2),
  new Appartment(103, 3, people3),
];

const myHouse = new House(`Wall St.`, 3, appartments); //адресс, кол-во этажей,
myHouse.showInfo();