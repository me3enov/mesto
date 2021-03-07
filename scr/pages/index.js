//import CSS
import './index.css';
//IMPORT MODULES START
import {data} from '../utils/data.js'
import {
  popups,
  cardsListSelector,
  editButtonItem,
  addButtonItem,
  formPlaceEditItem,
  formElementNameItem,
  formElementJobItem,
  formPlaceAddItem,
  formElementTitleItem,
  formElementLinkItem,
  configValidator,
  configCard,
  configPopup,
  configPopupWithForm,
  configPopupWithImage,
  configUserInfo}
from '../utils/constants.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidator.js';
//IMPORT MODULES END

//FUNCTION START
//userInfo init
const userInfo = new UserInfo(configUserInfo);

//popupEdit init
const popupEdit = new PopupWithForm({
  selector: popups.popupEditSelector,
  config: configPopup,
  extend: configPopupWithForm,
  submit: editProfile
});
popupEdit.setEventListeners();

//popupAdd init
const popupAdd = new PopupWithForm({
  selector: popups.popupAddSelector,
  config: configPopup,
  extend: configPopupWithForm,
  submit: addCard
});
popupAdd.setEventListeners();

//popupImg init
const popupImg = new PopupWithImage({
  selector: popups.popupImgSelector,
  config: configPopup,
  extend: configPopupWithImage
});
popupImg.setEventListeners();

//cards init
const cards = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }
}, cardsListSelector);

//create new card
const createCard = (item) => {
  const card = new Card(item, configCard, {
    handleCardClick: (item) => {
      popupImg.open(item);
    }
  });
  return card.generateCard();
}

//edit profile form submit
function editProfile () {
  //set profile values
  const userData = {
    name: formElementNameItem.value,
    job: formElementJobItem.value
  }
  userInfo.setUserInfo(userData);
}

//add post form submit
function addCard () {
  //set cards values
  const cardData = {
    name: formElementTitleItem.value,
    link: formElementLinkItem.value
  }
  //create card
  const card = createCard(cardData);
  cards.addItem(card);
}

//INIT ALL CARDS
cards.renderItems(data);

//LISTENER INIT START
//call edit popup button
editButtonItem.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formElementNameItem.value = userData.name;
  formElementJobItem.value = userData.job;
  popupEdit.open();
})

//call add popup button
addButtonItem.addEventListener('click', () => {
  popupAdd.open();
  formEdit.clearValidation();
})

//enable forms validation
const formEdit = new FormValidator({
  selector: formPlaceEditItem,
  config: configValidator
});

formEdit.enableValidation(popupEdit);

const formAdd = new FormValidator({
  selector: formPlaceAddItem,
  config: configValidator
});

formAdd.enableValidation(popupAdd);
//FUNCTION END