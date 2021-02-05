//validation config
const validationConfig = {
  formSelector: '.form',
  formFieldset: '.form__input-container',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//show validation error in input
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//hide validation error in input
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//check input
const checkInputValidity = (formElement, inputElement, config) => {
  //if not valid
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    //if valid
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//set event listeners in inputs
const setEventListeners = (formElement, config) => {
  //array all inputs
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  //submit button
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  //toggle submit button state
  toggleButtonState (inputList, buttonElement);
  //cycle for array inputs - add event listeners
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState (inputList, buttonElement, config);
    });
  });
};

//enable validation (object)
const enableValidation = (config) => {
  //array all forms
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //cycle for array forms
  formList.forEach((formElement) => {
    //array all fieldset objects
    const fieldsetList = Array.from(formElement.querySelectorAll(config.formFieldset));
    fieldsetList.forEach((item) => {
      setEventListeners(item, config);})
    }
  );
};

//if invalid input return invalid form
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//toggle submit button state
function toggleButtonState (inputList, buttonElement) {
  //if invalid - add inactive class & disabled state
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  //if valid - remove inactive class & disabled state
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//clear validation errors
function clearValidation (popup, config) {
  //array all input
  const currentInput = popup.querySelectorAll(config.inputSelector);
  //cycle for array inputs - clear validation errors in input
  currentInput.forEach((item) => {
    item.classList.remove(config.inputErrorClass);
    const currentElement = popup.querySelector(`#${item.id}-error`);
    currentElement.classList.remove(config.errorClass);
    currentElement.textContent = '';
  })
}

enableValidation(validationConfig);