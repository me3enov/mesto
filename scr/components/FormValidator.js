export class FormValidator {
  constructor (form, config) {
    this._form = form;

    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorPrefix = config.errorPrefix;
  }

  //show validation error in input
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id+this._errorPrefix}`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };

  //hide validation error in input
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id+this._errorPrefix}`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };

  //if invalid input return invalid form
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //check input
  _checkInputValidity (inputElement) {
    //if not valid
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      //if valid
    } else {
      this._hideInputError(inputElement);
    }
  };

  //toggle submit button state
  _toggleButtonState () {
    //if invalid - add inactive class & disabled state
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    //if valid - remove inactive class & disabled state
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //clear validation errors
  _clearValidation () {
    //array all inputs
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //submit button
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    //toggle submit button state
    this._toggleButtonState (this.inputList);
    //cycle for array inputs - clear validation errors in input
    this._inputList.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
      this._currentElement = this._form.querySelector(`#${item.id+this._errorPrefix}`);
      this._currentElement.classList.remove(this._errorClass);
      this._currentElement.textContent = '';
    })
  }

  //set event listeners in inputs
  _setEventListeners () {
    //array all inputs
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //submit button
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    //toggle submit button state
    this._toggleButtonState (this.inputList);
    //cycle for array inputs - add event listeners
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(this._inputList);
      });
    });
    //clear validation errors
    this._form.addEventListener('reset', () => {
      this._clearValidation();
    })
  };

  //enable validation (object)
  enableValidation() {
    this._setEventListeners();
  }
}