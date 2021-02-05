//GLOBAL SCOPE START
//buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
let closeButton;

//popups
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
    //create card
    const card = createCard(titleUppValue, linkValue);
    renderCard(card);
  });
}
createCards();

//submit form add post
function addCard (evt) {
  evt.preventDefault();
  //find current form
  const currentForm = Array.from(formPlaceAdd.querySelectorAll(formItem.inputSelector));
  //if valid
  if(!hasInvalidInput(currentForm)) {
    //set cards values
    const titleUppValue = formElementTitle.value.slice(0, 1).toUpperCase() + formElementTitle.value.slice(1);
    //create card
    const card = createCard(titleUppValue, formElementLink.value);
    renderCard(card);
    //reset forms
    formElementTitle.value = '';
    formElementTitle.value = '';
    //close popup
    closePopUp(popupAdd);
  }
}

//create card
function createCard(titleValue = 'Место', linkValue = 'Ссылка') {
  //clone card
  const cardElement = cardTemplate.cloneNode(true);
  //set card params
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = titleValue;
  cardImage.style.backgroundImage = `url(${linkValue})`;
  //add listeners
  cardElement.querySelector('.card__bin').addEventListener('click', removeCard);
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardImage.addEventListener('click', paramsImgPopup);
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
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

function paramsEditPopup() {
  formElementName.value = profileName.textContent;
  formElementJob.value = profileJob.textContent;
  openPopUp(popupEdit);
}

function paramsImgPopup(evt) {
  //set profile value
  cardTitle = evt.target.closest('.card');
  imageDesc.textContent = cardTitle.textContent;
  imageFool.setAttribute('src', evt.target.style.backgroundImage.slice(5, -2));
  //open image popup
  openPopUp(popupImg);
}

//close popups start
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOverlay);
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
  //find current form
  const currentForm = Array.from(formPlaceEdit.querySelectorAll(formItem.inputSelector));
  //if valid
  if(!hasInvalidInput(currentForm)) {
    //set profile values
    profileName.textContent = formElementName.value.slice(0, 1).toUpperCase() + formElementName.value.slice(1);
    profileJob.textContent = formElementJob.value.slice(0, 1).toUpperCase() + formElementJob.value.slice(1);
    //close popup
    closePopUp(document.querySelector('.popup_opened'));
  }
}
//!!FUNCTIONS END!!

//listeners start
//call popup buttons
editButton.addEventListener('click', paramsEditPopup);
addButton.addEventListener('click', () => openPopUp(popupAdd));
//popup close buttons
popupEdit.querySelector('.popup__close-button_place_edit').addEventListener('click', () => closePopUp(popupEdit));
popupAdd.querySelector('.popup__close-button_place_add').addEventListener('click', () => closePopUp(popupAdd));
popupImg.querySelector('.popup__close-button_place_img').addEventListener('click', () => closePopUp(popupImg));
//listeners end