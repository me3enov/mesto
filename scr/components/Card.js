export class Card {
  //constructor for the "Card" class
  constructor(data, config, {handleCardClick}) {
    this._handleCardClick = handleCardClick;

    this._data = data;
    this._title = data.name;
    this._image = data.link;

    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._binBtnSelector = config.binBtnSelector;
    this._likeBtnSelector = config.likeBtnSelector;
    this._likedClass = config.likedClass;
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

  //upper first letter
  _toUpperCase(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);;
  }

  //remove card
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  //toggle like card
  _likeCard(evt) {
    evt.target.classList.toggle(this._likedClass);
  }

  //set event listeners the "Card" class
  _setEventListeners() {
    this._element.querySelector(this._binBtnSelector).addEventListener('click', () => this._removeCard());
    this._element.querySelector(this._likeBtnSelector).addEventListener('click', (evt) => this._likeCard(evt));
    this._element.querySelector(this._imageSelector).addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  generateCard() {
    //get template card
    this._element = this._getTemplate();
    //set variables card
    this._element.querySelector(this._titleSelector).textContent = this._toUpperCase(this._title);
    this._element.querySelector(this._imageSelector).style.backgroundImage = `url(${this._image})`;
    //set event listeners card
    this._setEventListeners();

    return this._element;
  }
}