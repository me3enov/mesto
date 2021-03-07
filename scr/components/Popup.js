export default class Popup {
  //constructor for the "Popup" class
  constructor(selector, config) {
    this._popupSelector = selector;
    this._popup = document.querySelector(this._popupSelector);

    this._closeButtonClass = config.closeButtonClass
    this._popupOpenedClass = config.popupOpenedClass

    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //open popup
  open() {
    this._popup.classList.add(this._popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  //close popup
  close() {
    this._popup.classList.remove(this._popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscClose);
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
}