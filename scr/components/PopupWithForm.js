//import main class "PopupWithFormDefault"
import PopupWithFormDefault from './PopupWithFormDefault.js';

//extends "Popup"
export class PopupWithForm extends PopupWithFormDefault {
  //constructor for the "PopupWithFormDefault" class
  constructor(settings) {
    super(settings);
  }

  //if submit evt handler
  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  //get input values
  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll(this._settings.extend.formInputSelector));
    const data = {};
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  //set event listeners "PopupWithForm" class popup
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEvtHandler);
  }
}