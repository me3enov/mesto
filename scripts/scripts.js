//GLOBAL SCOPE START
//buttons
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//popups
const popUps = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_place_edit');
const popupAdd = document.querySelector('.popup_place_add');
const popupImg = document.querySelector('.popup_place_img');

//cards gallery
const gallery = document.querySelector('.gallery');

//card template
const cardTemplate = document.querySelector('#card-template').content;

//text content
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//full image
const imageFool = document.querySelector('.popup__image');
const imageDesc = document.querySelector('.popup__description');

//forms
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
//auto create cards start
function createCards() {
  initialCards.forEach(function (element) {
    //set values card
    const titleValue = element.name;
    const titleUppValue = titleValue.slice(0, 1).toUpperCase() + titleValue.slice(1);
    const linkValue = element.link;
    const cardData = {
      title: titleUppValue,
      link: linkValue
    }
    //create card
    const card = createCard(cardData);
    renderCard(card);
  });
}
createCards();

//submit form add post
function addCard (evt) {
  evt.preventDefault();
  //set cards values
  const titleUppValue = formElementTitle.value.slice(0, 1).toUpperCase() + formElementTitle.value.slice(1);
  const cardData = {
    title: titleUppValue,
    link: formElementLink.value
  }
  //create card
  const card = createCard(cardData);
  renderCard(card);
  //reset forms
  formPlaceAdd.reset();
  //close popup
  closePopUp(popupAdd);
}

//create card
function createCard(cardData) {
  //clone card
  const cardElement = cardTemplate.cloneNode(true);
  //set card params
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.title;
  cardImage.style.backgroundImage = `url(${cardData.link})`;
  //add listeners
  cardElement.querySelector('.card__bin').addEventListener('click', removeCard);
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardImage.addEventListener('click', setParamsImgPopup);
  //add card to website
  return (cardElement);
}

//add card to website
function renderCard(card) {
  gallery.prepend(card);
}

//remove card
function removeCard(evt) {
  evt.target.closest('.card').remove();
}

//toggle like card
function likeCard(evt) {
  evt.target.classList.toggle('card__like_state_liked');
}

//open popups start
function openPopUp(popup, config) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function setParamsEditPopup() {
  formElementName.value = profileName.textContent;
  formElementJob.value = profileJob.textContent;
  openPopUp(popupEdit);
  clearValidation(popupEdit, validationConfig);
}

function setParamsAddPopup() {
  enableValidation(validationConfig);
  openPopUp(popupAdd);
  clearValidation(popupAdd, validationConfig);
}

function setParamsImgPopup(evt) {
  //set profile value
  const cardTitle = evt.target.closest('.card');
  imageDesc.textContent = cardTitle.textContent;
  imageFool.setAttribute('src', evt.target.style.backgroundImage.slice(5, -2));
  //open image popup
  openPopUp(popupImg);
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
    popup.addEventListener('click', closePopupOverlay);
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