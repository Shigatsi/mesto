import {
  fullsizeImg,
  fullsizeImgCaption,
  imgForm } from '../utils/constants.js';

import {  openPopup } from '../utils/utils.js';

export default class Card{
  constructor(data, cardSelector){
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  //приватный метод like
  _toggleLikeActive(){
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
  }

  //приватный метод fullsize
  _imageFullsizeHandler(){
    const elemImg = this._element.querySelector('.elements__image');
    fullsizeImg.src = elemImg.src;
    fullsizeImgCaption.textContent = elemImg.alt;
    openPopup(imgForm);
  }

  //приватный метод delete
  _deletButtonHandler(){
    this._element.querySelector('.elements__rbin-button').closest('.elements__item').remove();
  }

  //приватный метод установка слушателей
  _setEventListeners(){
    // кнопка лайк: тоггл класса
    this._element.querySelector('.elements__like-button').addEventListener('click', ()=>{this._toggleLikeActive()});
    //кнопка корзина: удоление карточки
    this._element.querySelector('.elements__rbin-button').addEventListener('click', ()=>{this._deletButtonHandler()});
    //кнопка-изображение: для открытия формы просмотра фото
    this._element.querySelector('.elements__image').addEventListener('click',()=>{this._imageFullsizeHandler()});
  }

   //публичный метод создание карточки
   generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__title').textContent =this._name;
    const cardElementImage = this._element.querySelector('.elements__image');
    cardElementImage.src=this._link;
    cardElementImage.alt = this._alt;

    return this._element;
  }
}