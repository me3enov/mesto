//import CSS
import './index.css';
//IMPORT MODULES START
import {data} from '../utils/data.js'
import {
  popups,
  cardsListSelector,
  editButtonItem,
  addButtonItem,
  profileNameItem,
  profileJobItem,
  formPlaceEditItem,
  formElementNameItem,
  formElementJobItem,
  formPlaceAddItem,
  formElementTitleItem,
  formElementLinkItem,
  configValidator,
  configCard,
  configPopup,
  configPopupWithImage,
  configUserInfo}
from '../utils/constants.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidator.js';
//IMPORT MODULES END

//FUNCTION START
const userInfo = new UserInfo(configUserInfo);

const popupEdit = new Popup(popups.popupEditSelector, configPopup);
const popupAdd = new Popup(popups.popupAddSelector, configPopup);
const popupImg = new PopupWithImage(popups.popupImgSelector, configPopup, configPopupWithImage);

const cards = new Section({
  renderer: (item) => {
    const card = createCard(item);
    const cardItem = card.generateCard();
    cards.addItem(cardItem);
  }
}, cardsListSelector);

//create new card
const createCard = (item) => {
  const card = new Card(item, configCard, {
    handleCardClick: (item) => {
      popupImg.open(item);
    }
  });
  return card;
}

//edit profile form submit
function editProfile (evt) {
  evt.preventDefault();
  //set profile values
  profileNameItem.textContent = formElementNameItem.value.slice(0, 1).toUpperCase() + formElementNameItem.value.slice(1);
  profileJobItem.textContent = formElementJobItem.value.slice(0, 1).toUpperCase() + formElementJobItem.value.slice(1);
  //close popup
  popupEdit.close();
}

//add post form submit
function addCard (evt) {
  evt.preventDefault();
  //set cards values
  const cardData = {
    name: formElementTitleItem.value,
    link: formElementLinkItem.value
  }
  //create card
  cards.renderItems([cardData]);
  //close popup
  popupAdd.close();
}

//INIT ALL CARDS
cards.renderItems(data);

//LISTENER INIT START
//call edit popup button
editButtonItem.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  formElementNameItem.value = profileData.name;
  formElementJobItem.value = profileData.job;
  popupEdit.open();
})

//call add popup button
addButtonItem.addEventListener('click', () => {
  popupAdd.open();
})

//edit profile form submit
formPlaceEditItem.addEventListener('submit', editProfile);

//add card form submit
formPlaceAddItem.addEventListener('submit', addCard);
//LISTENER INIT END

//enable forms validation
const formEdit = new FormValidator (formPlaceEditItem, configValidator);
formEdit.enableValidation(popupEdit);
const formAdd = new FormValidator (formPlaceAddItem, configValidator);
formAdd.enableValidation(popupAdd);
//FUNCTION END