//класс PopupWithImage

import Popup from './Popup.js';
import {
  fullsizeImg,
  fullsizeImgCaption
} from '../utils/constants.js';


export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }
  //публичный метод:перезаписываем родительский метод открытия окна
  openPopup(cardElementImage) {
    fullsizeImg.src = cardElementImage.src;
    fullsizeImgCaption.textContent = cardElementImage.alt;
    super.openPopup();
  }
}
