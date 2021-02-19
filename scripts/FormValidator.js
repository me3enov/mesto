export class FormValidator {
  constructor (config, form) {
    this._form = form;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  //show validation error in input
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };

  //hide validation error in input
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };

  //if invalid input return invalid form
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //check input
  _checkInputValidity = (inputElement) => {
    //if not valid
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      //if valid
    } else {
      this._hideInputError(inputElement);
    }
  };

  //toggle submit button state
  _toggleButtonState (inputList, buttonElement) {
    //if invalid - add inactive class & disabled state
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
    //if valid - remove inactive class & disabled state
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //set event listeners in inputs
  _setEventListeners () {
    //array all inputs
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //submit button
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    //toggle submit button state
    this._toggleButtonState (inputList, buttonElement);
    //cycle for array inputs - add event listeners
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //enable validation (object)
  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  };

  //clear validation errors
  clearValidation (popup) {
    //array all inputs
    const inputList = Array.from(popup.querySelectorAll(this._inputSelector));
    //submit button
    const buttonElement = popup.querySelector(this._submitButtonSelector);
    //toggle submit button state
    this._toggleButtonState (inputList, buttonElement);
    //cycle for array inputs - clear validation errors in input
    inputList.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
      const currentElement = popup.querySelector(`#${item.id}-error`);
      currentElement.classList.remove(this._errorClass);
      currentElement.textContent = '';
    })
  }
}