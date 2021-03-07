//import main class "Popup"
import Popup from './Popup.js';

//extends "Popup"
export class PopupWithImage extends Popup {
  //constructor for the "PopupWithImage" class
  constructor(settings) {
    super(settings.selector, settings.config);
    this._settings = settings;
    this._popupImg = this._popup.querySelector(this._settings.extend.popupImageSelector);
    this._popupImgCaption = this._popup.querySelector(this._settings.extend.popupDescriptionSelector);
  }

  //open "PopupWithImage" class popup
  open(data) {
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupImgCaption.textContent = data.name;
    super.open();
  }
}