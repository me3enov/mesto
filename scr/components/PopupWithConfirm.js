//import main class "PopupWithFormDefault"
import PopupWithFormDefault from './PopupWithFormDefault.js';

//extends "PopupWithFormDefault"
export class PopupWithConfirm extends PopupWithFormDefault {
  //constructor for the "PopupWithFormDefault" class
  constructor(settings) {
    super(settings);
  }

  //if submit form
  _submitEvtHandler() {
    this._submit(this._cardData);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  //set event listeners the "PopupWithConfirm" class
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitEvtHandler();
    });
  }

  //open popup "PopupWithConfirm" class
  open(cardData) {
    super.open();
    this._cardData = cardData;
  }
}