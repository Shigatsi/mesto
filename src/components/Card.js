
export default class Card{
  constructor({
    data,
    cardSelector,
    handleCardClick,
    deleteButtonHandler,
    putLikeHandler,
    deleteLikeHandler
  }){
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this.like = data.like;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this.likeNum = data.likes.length;
    this.like = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteButtonHandler = deleteButtonHandler;
    this.putLikeHandler = putLikeHandler;
    this.deleteLikeHandler = deleteLikeHandler
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


  //публичный метод удаления карточки из разметки
  removeCard(){
    this._element.remove();
    // Зануляем ссылку на элемент, чтобы сборщик мусора начал работать.
    this._element = null;
  }


  //приватный метод установка слушателей
  _setEventListeners(){
    // кнопка лайк: тоггл класса
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._toggleLikeActive()
      if ( this._element.querySelector('.elements__like-button').classList.contains('elements__like-button_active')){
        console.log('zalike!')
        this.deleteLikeHandler(this._cardId)
      } else {this.putLikeHandler(this._cardId)}
    });
    //
    //кнопка корзина: удоление карточки
    // this._element.querySelector('.elements__rbin-button').addEventListener('click', () => {this._deleteButtonHandler(this._cardId)});
    this._element.querySelector('.elements__rbin-button').addEventListener('click', () => {this._deleteButtonHandler()});
    //кнопка-изображение: для открытия формы просмотра фото
    this._element.querySelector('.elements__image').addEventListener('click',() => {
      this._handleCardClick(this._element.querySelector('.elements__image'))
    });

  }

   //публичный метод создания карточки
   generateCard(userId){
    // const name = item.name;
    // const link = item.link
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__title').textContent =this._name;
    this._element.querySelector('.elements__like-counter').textContent = this.likeNum;//отоброжаем количество лайков
    const cardElementImage = this._element.querySelector('.elements__image');
    cardElementImage.src=this._link;
    cardElementImage.alt = this._name;
    //не отображаем корзину на чужых карточках
    if (this._cardOwnerId != userId) {
      this._element.querySelector('.elements__rbin-button').classList.add('elements__rbin-button_hidden');
    }

    return this._element;
  }

  //получение ID карточки
  getCardId(){
  return this._cardId;
  }
}
