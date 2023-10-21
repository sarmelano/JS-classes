const form1 = createForm('form1');
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

  const form2 = createForm('form2');
  const fields2 = Array.from({ length: apartmentsCount }, (_, i) => [
    { label: 'Номер ' + (i + 1) + ' квартиры:', id: `number${i + 1}` },
    { label: 'Кол-во комнат:', id: `roomsAmount${i + 1}` },
    { label: 'Кол-во жильцов:', id: `residents${i + 1}` }
  ]).flat();
  addFieldsToForm(form2, fields2);
  addButtonToForm(form2, 'apartment-form_btn', 'Далее', function () {
    const residentsCounts = Array.from({ length: apartmentsCount }, (_, i) => parseInt(getInputValue(`residents${i + 1}`)));

    form2.classList.add('hidden');

    const form3 = createForm('form3');
    residentsCounts.forEach((residentsCount, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'wrapper';

      for (let j = 1; j <= residentsCount; j++) {
        const label = document.createElement('label');
        label.textContent = `Имя жильца ${j} в квартире ${i + 1}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `resident${i + 1}_${j}`;

        const errorSpan = document.createElement('span');
        errorSpan.id = input.id + 'Error';
        errorSpan.style.color = 'red';

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errorSpan);
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