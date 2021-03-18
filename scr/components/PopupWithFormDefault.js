//import main class "Popup"
import Popup from './Popup.js';

//extends "Popup"
export default class PopupWithFormDefault extends Popup {
  //constructor for the "PopupWithFormDefault" class
  constructor(settings) {
    super(settings.selector, settings.config);
    this._settings = settings;
    this._form = this._popup.querySelector(this._settings.extend.formSelector);
    this._submit = this._settings.submit;
    this._submitButton = this._form.querySelector(this._settings.extend.submitButtonSelector);
    this._textSubmitButton = this._submitButton.textContent;
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  //set loading status
  renderLoading(isLoading, loadingMessage = 'Cохранение...') {
    isLoading ? this._submitButton.textContent = loadingMessage : this._submitButton.textContent = this._textSubmitButton;
  }

  //close "PopupWithForm" class popup
  close() {
    super.close();
    this._form.reset();
  }
}