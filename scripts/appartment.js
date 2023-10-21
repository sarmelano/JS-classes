class Appartment {
  /**
   * 
   * @param {number} number 
   * @param {number} roomsAmount 
   * @param {residents[]} residents 
   */
  constructor(number, roomsAmount, residents) {
    this.number = number;
    this.roomsAmount = roomsAmount;
    this.residents = residents;

  }

  showInfo() {
    console.log(`
    Apt. #: ${this.number}
    Rooms : ${this.roomsAmount}
    Residents: 
    `);

    this.residents.forEach(person => person.showInfo());
  }



  
}