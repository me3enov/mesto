//import modules
import {openPopUp, popup, popupImg, popupImgCaption} from './utils.js'

export class Card {
  //constructor for the "Card" class
  constructor(data, config) {
    this.data = data;
    this._title = data.name;
    this._image = data.link;

    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._binBtnSelector = config.binBtnSelector;
    this._likeBtnSelector = config.likeBtnSelector;
    this._likedSelector = config.likedSelector;

    this._popup = popup;
    this._popupImg = popupImg;
    this._popupImgCaption = popupImgCaption;
  }

  //get template card from page
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  _toUpperCase() {
    //upper first letter
    return this._title.slice(0, 1).toUpperCase() + this._title.slice(1);;
  }

  //remove card
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  //toggle like card
  _likeCard(evt) {
    evt.target.classList.toggle(this._likedSelector);
  }

  //open popup img
  _openImgPopup() {
    //set variables
    this._popupImg.src = this._image;
    this._popupImgCaption.textContent = this._title;
    //open image popup
    openPopUp(this._popup);
  }

  //set event listeners the "Card" class
  _setEventListeners() {
    this._element.querySelector(this._binBtnSelector).addEventListener('click', () => this._removeCard());
    this._element.querySelector(this._likeBtnSelector).addEventListener('click', (evt) => this._likeCard(evt));

    this._element.querySelector(this._imageSelector).addEventListener('click', () => this._openImgPopup());
  }

  generateCard() {
    //get template card
    this._element = this._getTemplate();
    //set event listeners card
    this._setEventListeners();
    //set variables card
    this._element.querySelector(this._titleSelector).textContent = this._toUpperCase();
    this._element.querySelector(this._imageSelector).style.backgroundImage = `url(${this._image})`;

    return this._element;
  }
}