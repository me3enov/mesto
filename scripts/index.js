//GLOBAL SCOPE START

//import modules
import {data, Card, FormValidator} from './utils.js'

//validation config for class FormValidator
const configValidator = {
  formSelector: '.form',
  formFieldset: '.form__input-container',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//card config for "Card" class
const configCard = {
  templateSelector: '#card-template',
  cardSelector: '.card',
  titleSelector: '.card__title',
  imageSelector: '.card__image',
  binBtnSelector: '.card__bin',
  likeBtnSelector: '.card__like',
  likedSelector: 'card__like_state_liked'
};

//buttons
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//popups
const popUps = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_place_edit');
const popupAdd = document.querySelector('.popup_place_add');
const popupImg = document.querySelector('.popup_place_img');

//cards list
const cardList = document.querySelector('.gallery');

//text content
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//edit profile
const formPlaceEdit = document.querySelector('.form_place_edit');
const formElementName = document.querySelector('.form__input_string_name');
const formElementJob = document.querySelector('.form__input_string_job');
//add card
const formPlaceAdd = document.querySelector('.form_place_add');
const formElementTitle = document.querySelector('.form__input_string_title');
const formElementLink = document.querySelector('.form__input_string_link');
//GLOBAL SCOPE END

//!!FUNCTIONS START!!

//submit form add post
function addCard (evt) {
  evt.preventDefault();
  //set cards values
  const cardData = {
    name: formElementTitle.value,
    link: formElementLink.value
  }
  //create card
  renderCard(cardData)
  //reset forms
  formPlaceAdd.reset();
  //close popup
  closePopUp(popupAdd);
}

//add card to website
const renderCard = (item) => {
  //create new card
  const card = new Card (item, configCard);
  //fill in new card
  const cardElement = card.generateCard();
  //insert new card
  cardList.prepend(cardElement);
};

//open popups start
export function openPopUp(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//open popup edit
function setParamsEditPopup() {
  formElementName.value = profileName.textContent;
  formElementJob.value = profileJob.textContent;
  openPopUp(popupEdit);
  formEdit.clearValidation(popupEdit);
}

//open popup add
function setParamsAddPopup() {
  openPopUp(popupAdd);
  formAdd.clearValidation(popupAdd);
}

//close popups start
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    closePopUp(document.querySelector('.popup_opened'));
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp(document.querySelector('.popup_opened'));
  }
}

//submit form edit profile
function editProfile (evt) {
  evt.preventDefault();
  //set profile values
  profileName.textContent = formElementName.value.slice(0, 1).toUpperCase() + formElementName.value.slice(1);
  profileJob.textContent = formElementJob.value.slice(0, 1).toUpperCase() + formElementJob.value.slice(1);
  //close popup
  closePopUp(popupEdit);
}

//enable close listeners
function enableCloseListeners () {
  popUps.forEach(function (popup) {
    popup.addEventListener('mousedown', closePopupOverlay);
  });
  closeButtons.forEach(function (popup) {
    popup.addEventListener('click', () => closePopUp(document.querySelector('.popup_opened')));
  });
}
enableCloseListeners();
//!!FUNCTIONS END!!

//listeners start
//call popup buttons
editButton.addEventListener('click', setParamsEditPopup);
addButton.addEventListener('click', setParamsAddPopup);
//forms submit
formPlaceEdit.addEventListener('submit', editProfile);
formPlaceAdd.addEventListener('submit', addCard);
//listeners end

//auto-rendering cards after loading page
const renderCards = (items) => {
  items.forEach((item) => {
    renderCard(item)
  });
};
renderCards(data);

//auto-enable forms validation
const formEdit = new FormValidator (configValidator, formPlaceEdit);
formEdit.enableValidation(popupEdit);
const formAdd = new FormValidator (configValidator, formPlaceAdd);
formAdd.enableValidation(popupAdd);

export {popupImg};