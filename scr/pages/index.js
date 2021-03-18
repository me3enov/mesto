//import CSS
import './index.css';
//IMPORT MODULES START
import {
  id,
  apiConfig,
  popups,
  forms,
  buttons,
  cardsListSelector,
  configValidator,
  configCard,
  configPopup,
  configPopupWithForm,
  configPopupWithImage,
  configUserInfo}
from '../utils/constants.js';
import {Api} from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';
import {FormValidator} from '../components/FormValidator.js';
//IMPORT MODULES END

//FUNCTION START
//userInfo init
const userInfo = new UserInfo(configUserInfo);

//api init
const api = new Api({
  //main url
  url: apiConfig.url,
  headers: {
    authorization: apiConfig.authorization,
    'Content-Type': 'application/json'
  }
});

//get all data init
api.getAllData()
.then((data) => {
  const [userData, cardsData] = data;
  //current user id init
  id.myId = userData._id;
  //set user info
  userInfo.setUserInfo(userData);
  //render all cards
  cards.renderItems(cardsData);
})
.catch((err) => {
  //error log
  console.log(err);
})

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

//popupConfirm init
const popupConfirm = new PopupWithConfirm({
  selector: popups.popupConfirmSelector,
  config: configPopup,
  extend: configPopupWithForm,
  submit: removeCard
})
popupConfirm.setEventListeners();

//popupAvatar init
const popupAvatar = new PopupWithForm({
  selector: popups.popupAvatarSelector,
  config: configPopup,
  extend: configPopupWithForm,
  submit: editAvatar
});
popupAvatar.setEventListeners();

//all cards init
const cards = new Section({
  renderer: (item) => {
    //create card
    const card = createCard(item);
    //add card to the page
    cards.addItem(card, 'append');
  }
}, cardsListSelector);

//create new card
const createCard = (cardData) => {
  const card = new Card(cardData, configCard, id.myId, {
    handleCardClick: handleCardClick,
    handleLikeClick: (cardData) => {
      //check is liked card
      const isLiked = card.isLiked() ? api.unlikeCard(cardData) : api.likeCard(cardData);
      isLiked
        .then((cardData) => {
          //set likes count
          card.setLikes(cardData);
        })
        .catch((err) => {
          //error log
          console.log(`${err}`);
        });
    },
    handleBinClick: handleBinClick,
  });
  return card.generateCard();
}

//add post form submit
function addCard (cardData) {
  //saving start
  popupAdd.renderLoading(true, 'Cохранение...');
  api.addCard(cardData)
    .then((res) => {
      //add object card
      const card = createCard(res);
      cards.addItem(card, 'prepend');
      popupAdd.close();
    })
    .catch((err) => {
      //error log
      console.log(err);
    })
    .finally(() => {
      //all done
      popupAdd.renderLoading(false);
    })
}

//remove card submit
function removeCard (cardToRemove) {
  //saving start
  popupConfirm.renderLoading(true, 'Удаление...');
  api.removeCard(cardToRemove._item)
    .then(() => {
      //remove object card
      cardToRemove.removeCard();
      popupConfirm.close();
    })
    .catch((err) => {
      //error log
      console.log(err);
    })
    .finally(() => {
      //all done
      popupConfirm.renderLoading(false);
    })
}

//edit profile form submit
function editProfile (userData) {
  //saving start
  popupEdit.renderLoading(true, 'Cохранение...');
  api.setUserInfo(userData)
    .then((data) => {
      //set user info
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      //error log
      console.log(`${err}`);
    })
    .finally(() => {
      //all done
      popupEdit.renderLoading(false);
    })
}

//edit profile avatar form submit
function editAvatar (avatarData) {
  //saving start
  popupAvatar.renderLoading(true, 'Cохранение...');
  api.setUserAvatar(avatarData.link)
    .then((data) => {
      //set avatar image
      buttons.editAvatarBtn.style.backgroundImage = `url(${data.avatar})`;
      popupAvatar.close();
    })
    .catch((err) => {
      //error log
      console.log(`${err}`)
    })
    .finally(() => {
      //all done
      popupAvatar.renderLoading(false);
    })
}

//if click to the card
function handleCardClick (cardData) {
  popupImg.open(cardData);
}

//if click to bin
function handleBinClick (cardData) {
  popupConfirm.open(cardData)
}

//LISTENER INIT START
//call edit profile popup button
buttons.editProfileBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  forms.formElementName.value = userData.name;
  forms.formElementAbout.value = userData.about;
  popupEdit.open();
})

//call add card popup button
buttons.addCardBtn.addEventListener('click', () => {
  popupAdd.open();
  formEdit.clearValidation();
})

//call edit avatar popup button
buttons.editAvatarBtn.addEventListener('click', () => {
  popupAvatar.open();
  formAvatar.clearValidation();
});

//ENABLE FORMS VALIDATION START
//enable validation edit profile form
const formEdit = new FormValidator({
  selector: forms.formPlaceEdit,
  config: configValidator
});
formEdit.enableValidation(popupEdit);

//enable validation add card form
const formAdd = new FormValidator({
  selector: forms.formPlaceAdd,
  config: configValidator
});
formAdd.enableValidation(popupAdd);

//enable validation edit avatar form
const formAvatar = new FormValidator({
  selector: forms.formPlaceAvatar,
  config: configValidator
});
formAvatar.enableValidation(popupAvatar);
//ENABLE FORMS VALIDATION END
//FUNCTION END