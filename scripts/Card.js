//import modules
import {openPopUp} from './index.js'

export class Card {
  //constructor for the "Card" class
  constructor(cardSelector, config) {
    this._cardSelector = cardSelector;
    this._title = cardSelector.name;
    this._image = cardSelector.link;

    this._templateSelector = config.templateSelector;
    this.cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._binBtnSelector = config.binBtnSelector;
    this._likeBtnSelector = config.likeBtnSelector;
    this._likedSelector = config.likedSelector;

    this._popupSelector = config.popupSelector;
    this._popupImgSelector = config.popupImgSelector;
    this._popupCaptionSelector = config.popupCaptionSelector;
  }

  //get template card from page
  _getTemplate() {
    //card template
    const cardTemplate = document.querySelector(this._templateSelector).content;
    //clone card
    const cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  _toUpperCase() {
    //upper first letter
    return this._title.slice(0, 1).toUpperCase() + this._title.slice(1);;
  }

  //remove card
  _removeCard(evt) {
    evt.target.closest(this.cardSelector).remove();
  }

  //toggle like card
  _likeCard(evt) {
    evt.target.classList.toggle(this._likedSelector);
  }

  //open popup img
  _openImgPopup() {
    //set variables
    this._popupImgSelector.src = this._image;
    this._popupCaptionSelector.textContent = this._title;
    //open image popup
    openPopUp(this._popupSelector);
  }

  //set event listeners the "Card" class
  _setEventListeners() {
    this._element.querySelector(this._binBtnSelector).addEventListener('click', (evt) => this._removeCard(evt));
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