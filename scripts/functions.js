function createForm(id) {
  const form = document.createElement('form');
  form.id = id;
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

    const errorSpan = document.createElement('span');
    errorSpan.id = field.id + 'Error';
    errorSpan.style.color = 'red';

    if (field.id.startsWith('number')) {
      input.classList.add('shortest_input');
    }

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(errorSpan);
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

  button.addEventListener('click', (event) => {
    const inputFields = Array.from(form.querySelectorAll('input[type="text"]'));
    let allFieldsFilled = true;

    for (let i = 0; i < inputFields.length; i++) {
      const inputField = inputFields[i];
      const errorSpan = document.getElementById(inputField.id + 'Error');
      if (inputField.value === '') {
        errorSpan.textContent = 'Пожалуйста, заполните это поле';
        allFieldsFilled = false;
      } else {
        errorSpan.textContent = '';
      }
    }

    if (allFieldsFilled) {
      eventListener(event);
    }
  });

  buttonWrapper.appendChild(button);
  form.appendChild(buttonWrapper);
}

function getInputValue(id) {
  return document.getElementById(id).value;
}