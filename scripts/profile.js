//objects start
//buttons
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_place_edit');

//popups
const popup = document.querySelector('.popup_place_edit');

//forms
const btnSubmitEdit = document.querySelector('.form__submit-button');
const formElementName = document.querySelector('.form__user-name');
const formElementJob = document.querySelector('.form__user-job');
//forms values
let nameValue;
let jobValue;
//objects end

//listeners start
editButton.addEventListener('click', openPopup);
closeButtonEdit.addEventListener('click', closePopup);
btnSubmitEdit.addEventListener('click', EditFormSubmit);
//listeners end

//functions start
//edit profile start
//open popup edit profile
function openPopup() {
  popup.classList.add('popup_opened');
  //profile value
  formElementName.value = document.querySelector('.profile__name').textContent;
  formElementJob.value = document.querySelector('.profile__job').textContent;
}

//close popup edit profile
function closePopup() {
  popup.classList.remove('popup_opened');
}

//submit form edit profile
function EditFormSubmit (evt) {
  evt.preventDefault();

  //get values in profile
  function getValuesEdit() {
    //get values
    nameValue = formElementName.value;
    jobValue = formElementJob.value;
  }
  getValuesEdit();

  function setValuesProfile() {
    //set values
    if (isNaN(nameValue)) {
      document.querySelector('.profile__name').textContent = nameValue;
      closePopup();
    }
    if (isNaN(jobValue)) {
      document.querySelector('.profile__job').textContent = jobValue;
      closePopup();
    }
  }
  setValuesProfile();
}



