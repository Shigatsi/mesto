
export default class Card{
  constructor({
    data,
    myId,
    cardSelector,
    handleCardClick,
    deleteButtonHandler,
    putLikeHandler,
    deleteLikeHandler,

  }){
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this.likeNum = data.likes.length;
    this.likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteButtonHandler = deleteButtonHandler;
    this.putLikeHandler = putLikeHandler;
    this.deleteLikeHandler = deleteLikeHandler;
    this.myId = myId;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
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
      if(this._element.querySelector('.elements__like-button').classList.contains('elements__like-button_active')){
        this.deleteLikeHandler(this._cardId)
      } else {
        this.putLikeHandler(this._cardId);
      }
    });
    this._element.querySelector('.elements__rbin-button').addEventListener('click', () => {this._deleteButtonHandler(this._cardId)});
    //кнопка-изображение: для открытия формы просмотра фото
    this._element.querySelector('.elements__image').addEventListener('click',() => {
      this._handleCardClick(this._element.querySelector('.elements__image'))
    });

  }

  renderLikes(){
    this._element.querySelector('.elements__like-counter').textContent = this.likeNum;
    this.likes.forEach((like)=> {
      if(like._id == this.myId) {
        this._element.querySelector('.elements__like-button').classList.add('.elements__like-button_active');
      }

    });
  }

  updateLikesNum (likes) {
    this.likeNum = likes.length;
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    this.renderLikes();
  }

  isLiked () {
    return this.likes.some((like) =>{
       return like._id === this.myId;

    })
  }

   //публичный метод создания карточки
   generateCard(userId, index){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__title').textContent =this._name;
    //отоброжаем изначальное количество лайков
    this.renderLikes();
    // this._element.querySelector('.elements__like-counter').textContent = this.likeNum;
    // //отоброжаем изначальное количество лайков
    const cardElementImage = this._element.querySelector('.elements__image');
    this._element.index = index;
    cardElementImage.src=this._link;
    cardElementImage.alt = this._name;
    //не отображаем корзину на чужых карточках
    if (this._cardOwnerId != this.myId) {
      this._element.querySelector('.elements__rbin-button').classList.add('elements__rbin-button_hidden');
    }

    //отображение своего лайка
    // this.likes.forEach((like)=> {
    //   if(like._id == this.myId) {
    //     this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
    //   }

    // });

    return this._element;
  }

}
