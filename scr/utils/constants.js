//SELECTORS START
export const popups = {
  popupEditSelector: '.popup_place_edit',
  popupAddSelector: '.popup_place_add',
  popupImgSelector: '.popup_place_img'
};
export const cardsListSelector = '.gallery';
//SELECTORS END

//CONFIG FOR CLASSES START
//validation config for class FormValidator
export const configValidator = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  errorPrefix: `-error`
};

//card config for "Card" class
export const configCard = {
  templateSelector: '#card-template',
  cardSelector: '.card',
  titleSelector: '.card__title',
  imageSelector: '.card__image',
  binBtnSelector: '.card__bin',
  likeBtnSelector: '.card__like',
  likedClass: 'card__like_state_liked'
};

//card config for "Popup" class
export const configPopup = {
  closeButtonClass: 'popup__close-button',
  popupOpenedClass: 'popup_opened'
};

//card config for "PopupWithForm" class
export const configPopupWithForm = {
  formSelector: '.form',
  formInputSelector: '.form__input'
};

//card config for "PopupWithImage" class
export const configPopupWithImage = {
  popupImageSelector: '.popup__image',
  popupDescriptionSelector: '.popup__description'
};

//card config for "UserInfo" class
export const configUserInfo = {
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job'
};
//CONFIG FOR CLASSES END

//ITEMS START
//buttons
export const editButtonItem = document.querySelector('.profile__edit-button');
export const addButtonItem = document.querySelector('.profile__add-button');

//edit profile
export const formPlaceEditItem = document.querySelector('.form_place_edit');
export const formElementNameItem = document.querySelector('.form__input_string_name');
export const formElementJobItem = document.querySelector('.form__input_string_job');

//add card
export const formPlaceAddItem = document.querySelector('.form_place_add');
export const formElementTitleItem = document.querySelector('.form__input_string_title');
export const formElementLinkItem = document.querySelector('.form__input_string_link');
//ITEMS END