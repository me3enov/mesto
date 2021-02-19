//import modules
import {data} from './data.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {openPopUp} from './index.js'

const popup = document.querySelector('.popup_place_img');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__description');

export {data, Card, FormValidator, openPopUp, popup, popupImg, popupImgCaption};