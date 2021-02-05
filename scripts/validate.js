const formItem = {
  formSelector: '.form',
  formFieldset: '.form__input-container',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formItem.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formItem.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formItem.inputErrorClass);
  errorElement.classList.remove(formItem.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formItem.inputSelector));
  const buttonElement = formElement.querySelector(formItem.submitButtonSelector);
  toggleButtonState (inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState (inputList, buttonElement);
    });
  });
};

const enableValidation = (formItem) => {
  const formList = Array.from(document.querySelectorAll(formItem.formSelector));
  formList.forEach((formElement) => {
    switch (formElement.id) {
      case 'form_place_edit':
        formElement.addEventListener('submit', editProfile);
        break;
      case 'form_place_add':
        formElement.addEventListener('submit', addCard);
        break;
    }
    const fieldsetList = Array.from(formElement.querySelectorAll(formItem.formFieldset));
    fieldsetList.forEach((item) => {
      setEventListeners(item);})
    }
  );
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(formItem.inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(formItem.inactiveButtonClass);
  }
}

enableValidation(formItem);