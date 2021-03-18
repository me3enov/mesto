export class Card {
  //constructor for the "Card" class
  constructor(item, config, id, {handleCardClick, handleLikeClick, handleBinClick}) {
    //card id
    this._id = id;

    //data for the init card
    this.item = item;
    this._ownerId = this.item.owner._id;
    this._title = item.name;
    this._image = item.link;

    //functions for the card
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleBinClick = handleBinClick;

    //config for "Card" class
    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._binBtnSelector = config.binBtnSelector;
    this._likeBtnSelector = config.likeBtnSelector;
    this._likesCountSelector = config.likesCountSelector;
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

  //remove element
  _removeElement(element) {
    element.remove();
    element = null;
  }

  //add liked class
  _addLikedClass() {
    this._likeBtnElement.classList.add(this._likedClass);
  }

  //remove liked class
  _removeLikedClass() {
    this._likeBtnElement.classList.remove(this._likedClass);
  }

  //compare id card
  _checkId() {
    if (this._ownerId !== this._id) {
      this._removeElement(this._binBtnElement);
    }
  }

  //set event listeners the "Card" class
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this.item));
    this._likeBtnElement.addEventListener('click', () => this._handleLikeClick(this.item));
    this._binBtnElement.addEventListener('click', () => this._handleBinClick(this));
  }

  //check is liked card
  isLiked() {
    return this._isLiked;
  }

  //set likes count
  setLikes(cardData) {
    this._likeCountElement.textContent = cardData.likes.length;
    this._isLiked = cardData.likes.filter((item) => {return item._id === this._id}).length > 0;
    if (this._isLiked) {
      this._addLikedClass();
    }
    else {
      this._removeLikedClass();
    }
  }

  //generate card
  generateCard() {
    //get template card
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._likeBtnElement = this._element.querySelector(this._likeBtnSelector);
    this._binBtnElement = this._element.querySelector(this._binBtnSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeCountElement = this._element.querySelector(this._likesCountSelector);
    //set variables card
    this._titleElement.textContent = this._toUpperCase(this._title);
    this._imageElement.style.backgroundImage = `url(${this._image})`;
    //set event listeners card
    this.setLikes(this.item)
    this._checkId();
    this._setEventListeners();

    return this._element;
  }

  //remove card
  removeCard() {
    this._removeElement(this._element);
  }
}