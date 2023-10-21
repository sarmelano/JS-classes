class House {
  /**
   * 
   * @param {string} address 
   * @param {number} floors 
   * @param {Appartment[]} appartments 
   */
  constructor(address, floors, appartments) { //колво квартир
    this.address = address;
    this.floors = floors;
    this.appartments = appartments;
  }

  showInfo() {
    console.log(`
    Addres: ${this.address}
    Floors: ${this.floors}
    Appartments: 
    `)

    this.appartments.forEach(app => app.showInfo());
  }




}