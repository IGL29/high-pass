export default function validateForm({
  classMessageErrorsElement,
  classErrorShow,
  classErrorInputShow
}, ev) {

  return (function () {
    ev.preventDefault();

    const form = ev.currentTarget;
    const errorElements = form.getElementsByClassName(classMessageErrorsElement);
    const inputElements = getFieldValues(form);

    hideErrorDisplay(errorElements, inputElements, classErrorShow, classErrorInputShow);

    const errors = validateInputs(inputElements);

    if (errors.length) {
      for (const error of errors) {
        const elementErrorMessage = form.querySelector(`[data-error="${error.name}"]`);
        elementErrorMessage.textContent = error.message;
        elementErrorMessage.classList.add(classErrorShow)
        error.input.classList.add(classErrorInputShow);
      }
    } else {
      clearFields(inputElements);
    }
  })();
}

function hideErrorDisplay(errorElements, inputElements, classErrorShow, classErrorInputShow) {
  for (const elem of errorElements) {
    elem.classList.remove(classErrorShow);
  }

  for (const input of inputElements) {
    input.classList.remove(classErrorInputShow);
  }
}

function clearFields(inputElements) {
  for (const input of inputElements) {
    input.value = '';
  }
}

function getFieldValues(formElement) {
  let inputElements = [];

  for (const element of formElement.elements) {
    const isInput = element.tagName === 'INPUT';
    const isTextarea = element.tagName === 'TEXTAREA';

    if (isInput || isTextarea) {
      inputElements.push(element);
    }
  }
  return inputElements;
}

function validateInputs(inputElements) {
  let errors = [];

  for (const input of inputElements) {
    const inputName = input.name;
    const inputValue = input.value;

    if (inputName === 'email') {
      const verificationResult = checkEmail(inputValue);
      if (verificationResult) {
        errors.push({
          'input': input,
          'name': inputName,
          'message': verificationResult
        });
      }
    }

    if (inputName === 'name') {
      const verificationResult = checkName(inputValue);
      if (verificationResult) {
        errors.push({
          'input': input,
          'name': inputName,
          'message': verificationResult
        });
      }
    }
  }
  return errors;
}

function checkEmail(value) {
  if (value.trim() === '') {
    return 'поле не должно быть пустым'
  }

  if (!value.includes('@') || !value.includes('.')) {
    return 'некорректное значение'
  }

  return null;
}

function checkName(value) {
  if (value.trim() === '') {
    return 'поле не должно быть пустым'
  }
  return null;
}
