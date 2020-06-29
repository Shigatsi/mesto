
export default class Card{
  constructor({data, cardSelector, handleCardClick}){
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  //приватный метод delete
  _deleteButtonHandler(){
    this._element.remove();
    // Зануляем ссылку на элемент, чтобы сборщик мусора начал работать.
    this._element = null;
  }

  //приватный метод установка слушателей
  _setEventListeners(){
    // кнопка лайк: тоггл класса
    this._element.querySelector('.elements__like-button').addEventListener('click', ()=>{this._toggleLikeActive()});
    //кнопка корзина: удоление карточки
    this._element.querySelector('.elements__rbin-button').addEventListener('click', ()=>{this._deleteButtonHandler()});
    //кнопка-изображение: для открытия формы просмотра фото
    this._element.querySelector('.elements__image').addEventListener('click',()=>{this._handleCardClick(this._element.querySelector('.elements__image'))});
    //this._element.querySelector('.elements__image')
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