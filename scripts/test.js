class Person {
  constructor(fullname) {
    this.fullname = fullname;
  }

  showInfo() {
    console.log(`Resident: ` + this.fullname);
  }
}

class Apartment {
  /**
   * 
   * @param {number} number 
   * @param {number} roomsAmount 
   * @param {Person[]} residents 
   */
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
  /**
   * 
   * @param {string} address 
   * @param {number} floors 
   * @param {Apartment[]} apartments 
   */
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

const form = document.createElement('form');
form.id = 'form1';
form.className = 'house-form';

const fields = [
  { label: 'Адрес дома:', id: 'address' },
  { label: 'Кол-во этажей:', id: 'floors' },
  { label: 'Кол-во квартир:', id: 'apartments' }
];

fields.forEach(field => {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const label = document.createElement('label');
  label.textContent = field.label;
  label.setAttribute('for', field.id); // Associate the label with the form field

  const input = document.createElement('input');
  input.type = 'text';
  input.id = field.id;
  input.setAttribute('autocomplete', 'off'); // Add the autocomplete attribute

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  form.appendChild(wrapper);
});

const buttonWrapper = document.createElement('div');
buttonWrapper.className = 'wrapper';

const form1btn = document.createElement('input');
form1btn.type = 'button';
form1btn.id = 'house-form_btn';
form1btn.value = 'Далее';

buttonWrapper.appendChild(form1btn);
form.appendChild(buttonWrapper);

document.body.appendChild(form);

const submitButton = document.getElementById('house-form_btn');

submitButton.addEventListener('click', function () {
  const address = document.getElementById('address').value;
  const floors = parseInt(document.getElementById('floors').value);
  const apartments = parseInt(document.getElementById('apartments').value);

  document.getElementById('form1').classList.add('hidden');

  const form2 = document.createElement('form');
  form2.id = 'form2';
  form2.className = 'appartment-form';

  const apartmentsCount = parseInt(apartments);

  for (let i = 1; i <= apartmentsCount; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const fields = [
      { label: 'Номер ' + i + ' квартиры:', id: `number${i}` },
      { label: 'Кол-во комнат:', id: `roomsAmount${i}` },
      { label: 'Кол-во жильцов:', id: `residents${i}` }
    ];

    fields.forEach(field => {
      const label = document.createElement('label');
      label.textContent = field.label;
      label.setAttribute('for', field.id); // Associate the label with the form field

      const input = document.createElement('input');
      input.type = 'text';
      input.id = field.id;

      if (field.id.startsWith('number')) {
        input.classList.add('shortest_input'); // Add the class here
      }

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      form2.appendChild(wrapper);
    });
  }

  const buttonWrapper2 = document.createElement('div');
  buttonWrapper2.className = 'wrapper';

  const form2btn = document.createElement('input');
  form2btn.type = 'button';
  form2btn.id = 'apartment-form_btn';
  form2btn.value = 'Далее';

  buttonWrapper2.appendChild(form2btn);
  form2.appendChild(buttonWrapper2);

  document.body.appendChild(form2);

  form2btn.addEventListener('click', function () {
    /* const numb = document.getElementById('number').value; */
    const residentsCounts = [];
 
    for (let i = 1; i <= apartmentsCount; i++) {
      const residentsCount = parseInt(document.getElementById(`residents${i}`).value);
      residentsCounts.push(residentsCount);
    }

    document.getElementById('form2').classList.add('hidden');

    const form3 = document.createElement('form');
    form3.id = 'form3';

    residentsCounts.forEach((residentsCount, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'wrapper';

      for (let j = 1; j <= residentsCount; j++) {
        const label = document.createElement('label');
        label.textContent = `Имя жильца ${j} в квартире ${i + 1}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `resident${i + 1}_${j}`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
      }

      form3.appendChild(wrapper);
    });

    const buttonWrapper3 = document.createElement('div');
    buttonWrapper3.className = 'wrapper';

    const form3btn = document.createElement('input');
    form3btn.type = 'button';
    form3btn.id = 'resident-form_btn';
    form3btn.value = 'Готово';

    buttonWrapper3.appendChild(form3btn);
    form3.appendChild(buttonWrapper3);

    document.body.appendChild(form3);

    form3btn.addEventListener('click', function () {
      const residents = [];
      const apartments = [];

      residentsCounts.forEach((residentsCount, i) => {
        const apartmentResidents = [];

        for (let j = 1; j <= residentsCount; j++) {
          const residentName = document.getElementById(`resident${i + 1}_${j}`).value;
          const person = new Person(residentName);
          apartmentResidents.push(person);
        }

        const apartment = new Apartment(i + 1, parseInt(document.getElementById(`roomsAmount${i + 1}`).value), apartmentResidents);
        apartments.push(apartment);
      });

      const house = new House(address, floors, apartments);

      document.getElementById('form3').classList.add('hidden');

      house.showInfo();
    });
  });
});