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

function createForm(id, className) {
  const form = document.createElement('form');
  form.id = id;
  form.className = className;
  return form;
}

function addFieldsToForm(form, fields) {
  fields.forEach(field => {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', field.id);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = field.id;
    input.setAttribute('autocomplete', 'off');

    if (field.id.startsWith('number')) {
      input.classList.add('shortest_input');
    }

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });
}

function addButtonToForm(form, id, value, eventListener) {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'wrapper';

  const button = document.createElement('input');
  button.type = 'button';
  button.id = id;
  button.value = value;
  button.addEventListener('click', eventListener);

  buttonWrapper.appendChild(button);
  form.appendChild(buttonWrapper);
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

const form1 = createForm('form1', 'house-form');
const fields1 = [
  { label: 'Адрес дома:', id: 'address' },
  { label: 'Кол-во этажей:', id: 'floors' },
  { label: 'Кол-во квартир:', id: 'apartments' }
];
addFieldsToForm(form1, fields1);
addButtonToForm(form1, 'house-form_btn', 'Далее', function () {
  const address = getInputValue('address');
  const floors = parseInt(getInputValue('floors'));
  const apartmentsCount = parseInt(getInputValue('apartments'));

  form1.classList.add('hidden');

  const form2 = createForm('form2', 'appartment-form');
  const fields2 = Array.from({ length: apartmentsCount }, (_, i) => [
    { label: 'Номер ' + (i + 1) + ' квартиры:', id: `number${i + 1}` },
    { label: 'Кол-во комнат:', id: `roomsAmount${i + 1}` },
    { label: 'Кол-во жильцов:', id: `residents${i + 1}` }
  ]).flat();
  addFieldsToForm(form2, fields2);
  addButtonToForm(form2, 'apartment-form_btn', 'Далее', function () {
    const residentsCounts = Array.from({ length: apartmentsCount }, (_, i) => parseInt(getInputValue(`residents${i + 1}`)));

    form2.classList.add('hidden');

    const form3 = createForm('form3', '');
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
    addButtonToForm(form3, 'resident-form_btn', 'Готово', function () {
      const residents = [];
      const apartments = [];

      residentsCounts.forEach((residentsCount, i) => {
        const apartmentResidents = [];

        for (let j = 1; j <= residentsCount; j++) {
          const residentName = getInputValue(`resident${i + 1}_${j}`);
          const person = new Person(residentName);
          apartmentResidents.push(person);
        }

        const apartmentNumber = parseInt(getInputValue(`number${i + 1}`));
        const roomsAmount = parseInt(getInputValue(`roomsAmount${i + 1}`));

        const apartment = new Apartment(apartmentNumber, roomsAmount, apartmentResidents);
        apartments.push(apartment);
      });

      const house = new House(address, floors, apartments);

      form3.classList.add('hidden');

      house.showInfo();
    });

    document.body.appendChild(form3);
  });

  document.body.appendChild(form2);
});

document.body.appendChild(form1);