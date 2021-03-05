export class Popup {
  //constructor for the "Popup" class
  constructor(popupSelector, config) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);

    this._form = this._popup.querySelector(config.formSelector);
    this._popupImgClass = config.popupImgClass;
    this._closeButtonClass = config.closeButtonClass
    this._popupOpenedClass = config.popupOpenedClass

    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //open popup
  open() {
    this.setEventListeners();
    this._popup.classList.add(this._popupOpenedClass);
  }

  //close popup
  close() {
    if (!this._popup.classList.contains(this._popupImgClass)){
      this._form.reset();
    }
    this._removeEventListeners();
    this._popup.classList.remove(this._popupOpenedClass);
  }

  //close popup handle click
  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains(this._closeButtonClass)) {
      this.close();
    }
  }

  //close popup by "Esc"
  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  //set event listeners
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  //remove event listeners
  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}