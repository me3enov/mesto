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
const formElementName = document.querySelector('.form__item-text_string_name');
const formElementJob = document.querySelector('.form__item-text_string_job');
//add card
const formPlaceAdd = document.querySelector('.form_place_add');
const formElementTitle = document.querySelector('.form__item-text_string_title');
const formElementLink = document.querySelector('.form__item-text_string_link');
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
    createCard(titleUppValue, linkValue);
  });
}
createCards();

//submit form add post
function addCard (evt) {
  evt.preventDefault();
  //set cards values
  const titleUppValue = formElementTitle.value.slice(0, 1).toUpperCase() + formElementTitle.value.slice(1);
  //create card
  createCard(titleUppValue, formElementLink.value)
  //reset forms
  formElementTitle.value = '';
  formElementTitle.value = '';
  //close popup
  closePopUp(popupAdd);
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
  cardImage.addEventListener('click', ParamsImgPopup);
  //add card to html
  renderCard(cardElement);
}

//add card to html
function renderCard(cardElement) {
  gallery.prepend(cardElement);
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
  //open popup
  popup.classList.add('popup_opened');
  closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopUp.bind(null, popup));
}

function ParamsEditPopup() {
  formElementName.value = profileName.textContent;
  formElementJob.value = profileJob.textContent;
  openPopUp(popupEdit);
}

function ParamsImgPopup(evt) {
  //set profile value
  cardTitle = evt.target.closest('.card');
  imageDesc.textContent = cardTitle.textContent;
  imageFool.setAttribute('src', evt.target.style.backgroundImage.slice(5, -2));
  openPopUp(popupImg);
}

//close popups start
function closePopUp(popup) {
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
editButton.addEventListener('click', ParamsEditPopup);
addButton.addEventListener('click', openPopUp.bind(null, popupAdd));
formPlaceEdit.addEventListener('submit', editProfile);
formPlaceAdd.addEventListener('submit', addCard);
//listeners end