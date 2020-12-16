//objects start
//buttons
let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.popup__close-button');

//text content
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//popup
let popup = document.querySelector('.popup');

//form
let formPlaceEdit = document.querySelector('.form');
let formElementName = document.querySelector('.form__item-text_string-name');
let formElementJob = document.querySelector('.form__item-text_string-job');

//form values
let nameValue;
let jobValue;
//objects end

//functions start
//open popup edit profile
function openPopup() {
  popup.classList.add('popup_opened');
  //profile value
  formElementName.value = profileName.textContent;
  formElementJob.value = profileJob.textContent;
}

//close popup edit profile
function closePopup() {
  popup.classList.remove('popup_opened');
}

//submit form edit profile
function editFormSubmit (evt) {
  evt.preventDefault();
  //get values
  nameValue = formElementName.value;
  jobValue = formElementJob.value;
  //set values
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup();
}

//listeners start
editButton.addEventListener('click', openPopup);
closeButtonEdit.addEventListener('click', closePopup);
formPlaceEdit.addEventListener('submit', editFormSubmit);
//listeners end