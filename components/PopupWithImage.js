//класс PopupWithImage

import Card from './Card.js';
import {
  fullsizeImg,
  fullsizeImgCaption
} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
    this._popupElement = popupSelector;
  }
  //публичный метод:перезаписываем родительский метод открытия окна
  openPopup(elemImg) {
    fullsizeImg.src = elemImg.src;
    fullsizeImgCaption.textContent = elemImg.alt;
    super.openPopup();
  }
}
