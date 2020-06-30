//класс PopupWithImage

import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }
  //публичный метод:перезаписываем родительский метод открытия окна
  openPopup(cardElementImage) {
    this._popupElement.querySelector('.popup__fullsize-img').src = cardElementImage.src;
    this._popupElement.querySelector('.popup__fullsize-img-caption').textContent = cardElementImage.alt;
    super.openPopup();
  }
}
