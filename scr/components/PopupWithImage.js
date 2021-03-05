//import main class "Popup"
import {Popup} from './Popup.js';

//extends "Popup"
export class PopupWithImage extends Popup {
  //constructor for the "PopupWithImage" class
  constructor(popupSelector, config, extend) {
    super(popupSelector, config);
    this._popupImg = this._popup.querySelector(extend.popup__imageSelector);
    this._popupImgCaption = this._popup.querySelector(extend.popup__descriptionSelector);
  }

  //open Image popup
  open(data) {
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupImgCaption.textContent = data.name;
    super.open();
  }
}