//MY ID
export const id = {myId: ''};

//CONFIG FOR CLASSES START
//api config for class Api
export const apiConfig = {
  authorization: '08402336-c176-4b17-bc07-4e156c9de6bc',
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  cardsUrl: '/cards',
  cardsLikesUrl: '/cards/likes/',
  userAvatarUrl: '/users/me/avatar',
  userInfoUrl: '/users/me',
  errorText: 'Ошибка:'
};

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
  likesCountSelector: '.card__like-count',
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
  formInputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button'
};

//card config for "PopupWithImage" class
export const configPopupWithImage = {
  popupImageSelector: '.popup__image',
  popupDescriptionSelector: '.popup__description'
};

//card config for "UserInfo" class
export const configUserInfo = {
  profileAvatarSelector: '.profile__avatar',
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__job'
};
//CONFIG FOR CLASSES END

//ITEMS START
//container for the cards
export const cardsListSelector = '.gallery';

//popups
export const popups = {
  popupEditSelector: '.popup_place_edit',
  popupAddSelector: '.popup_place_add',
  popupImgSelector: '.popup_place_img',
  popupConfirmSelector: '.popup_place_confirm',
  popupAvatarSelector: '.popup_place_avatar'
};

//forms
export const forms = {
  formPlaceEdit: document.querySelector('.form_place_edit'),
  formElementName: document.querySelector('.form__input_string_name'),
  formElementAbout: document.querySelector('.form__input_string_job'),
  formPlaceAdd: document.querySelector('.form_place_add'),
  formPlaceAvatar: document.querySelector('.form_place_avatar')
};

//buttons
export const buttons = {
  editProfileBtn: document.querySelector('.profile__edit-button'),
  addCardBtn: document.querySelector('.profile__add-button'),
  editAvatarBtn: document.querySelector('.profile__avatar')
};
//ITEMS END
