//VALUES START
//objects start
//buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
let closeButton;

//popups
let popup;
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
const formElementName = document.querySelector('.form__item-text_string_name');
const formElementJob = document.querySelector('.form__item-text_string_job');
//add card
const formPlaceAdd = document.querySelector('.form_place_add');
const formElementTitle = document.querySelector('.form__item-text_string_title');
const formElementLink = document.querySelector('.form__item-text_string_link');
//objects end

//cards info init start
const initialCards = [
  {
    name: 'Стамбул',
    link: './images/istanbul.jpg'
  },
  {
    name: 'Сингапур',
    link: './images/singapore.jpg'
  },
  {
    name: 'Куала-Лумпур',
    link: './images/kuala-lumpur.jpg'
  },
  {
    name: 'Кемер',
    link: './images/kemer.jpg'
  },
  {
    name: 'Пхукет',
    link: './images/phuket.jpg'
  },
  {
    name: 'Саона',
    link: './images/saona.jpg'
  }
];
//cards info init end
//VALUES END

//!!FUNCTIONS START!!
//auto create cards start
function createCards() {
  initialCards.forEach(function (element) {
    //set values card
    let titleValue = element.name;
    titleValue = titleValue.slice(0, 1).toUpperCase() + titleValue.slice(1);
    let linkValue = element.link;
    //create card
    createCard(titleValue, linkValue);
  });
}
createCards();

//submit form add post
function addCard (evt) {
  evt.preventDefault();
  //set cards values
  let titleValue = document.querySelector('.form__item-text_string_title');
  let titleUppValue = titleValue.value.slice(0, 1).toUpperCase() + titleValue.value.slice(1);
  let linkValue = document.querySelector('.form__item-text_string_link');
  //create card
  createCard(titleUppValue, linkValue.value)
  //reset forms
  titleValue.value = '';
  linkValue.value = '';
  //close popup
  closePopUp();
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
  cardImage.addEventListener('click', openPopUp);
  //insert card
  gallery.prepend(cardElement);
}

//remove card
function removeCard(evt) {
  evt.target.parentElement.remove();
}

//toggle like card
function likeCard(evt) {
  evt.target.classList.toggle('card__like_state_liked');
}

//open popups start
function openPopUp(evt) {
  //open profile edit popup
  if (evt.target.classList.contains('profile__edit-button')) {
    popupEdit.classList.add('popup_opened');
    //set profile value
    formElementName.value = profileName.textContent;
    formElementJob.value = profileJob.textContent;
  }
  //open add card popup
  if (evt.target.classList.contains('profile__add-button')) {
    popupAdd.classList.add('popup_opened');
  }
  //open image popup
  if (evt.target.classList.contains('card__image')) {
    popupImg.classList.add('popup_opened');
    cardTitle = evt.target.closest('.card');
    imageDesc.textContent = cardTitle.textContent;
    imageFool.setAttribute('src', evt.target.style.backgroundImage.slice(5, -2));
  }
  popup = document.querySelector('.popup_opened');
  closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopUp);
}

//close popups start
function closePopUp(evt) {
  popup.classList.remove('popup_opened');
}

//submit form edit profile
function editProfile (evt) {
  evt.preventDefault();
  //set profile values
  profileName.textContent = formElementName.value.slice(0, 1).toUpperCase() + formElementName.value.slice(1);
  profileJob.textContent = formElementJob.value.slice(0, 1).toUpperCase() + formElementJob.value.slice(1);
  //close popup
  closePopUp();
}
//!!FUNCTIONS END!!

//listeners start
editButton.addEventListener('click', openPopUp);
addButton.addEventListener('click', openPopUp);
formPlaceEdit.addEventListener('submit', editProfile);
formPlaceAdd.addEventListener('submit', addCard);
//listeners end