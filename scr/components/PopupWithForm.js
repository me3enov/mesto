//import main class "Popup"
import Popup from './Popup.js';

//extends "Popup"
export class PopupWithForm extends Popup {
  //constructor for the "PopupWithForm" class
  constructor(settings) {
    super(settings.selector, settings.config);
    this._settings = settings;
    this._form = this._popup.querySelector(this._settings.extend.formSelector);
    this._submit = this._settings.submit;
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  //if submit evt handler
  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
    this.close();
  }

  //get input values
  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll(this._settings.extend.formInputSelector));
    const data = {};
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    console.log(data)
    return data;
  }

  //close "PopupWithForm" class popup
  close() {
    super.close();
    this._form.reset();
  }

  //set event listeners "PopupWithForm" class popup
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEvtHandler);
  }
}