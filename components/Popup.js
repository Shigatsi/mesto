// класс Popup, отвечает за открытие и закрытие попапа

export default class Popup {
  constructor (popupSelector) {
    this._popupElement = popupSelector;
  }

  //публичный метод: открытие окна
  openPopup() {
    this._popupElement.classList.remove('popup_hidden');
  }

 //публичный метод: закрытие окна
 closePopup() {
  this._popupElement.classList.add('popup_hidden');
  }

  //приватный метод: закрытие попапа клавишей Esc
  _handleEscClose() {
    if(evt.key==='Escape') {
      this._popupElement.classList.add('popup_hidden');
    }
  }
  //приватный метод: закрытие попапа по клику на оверлей
  _handleOverlayClose(evt){
    if(evt.target.classList.contains('popup')){
      closePopup(evt.target);
    };
  };

  //публичный метод: добавляет слушатели
  setEventListeners() {
    this._popupCloseBtn = this._popupElement
    .querySelector('.popup')
    .querySelector('.popup__close-button');
    //слушатель клика по иконке закрытия попапа
    this._popupCloseBtn.addEventListener('click', () =>{
      this.close()
    })
    //слушатель нажатия клавиши Esc
    document.addEventListener('keyup', () => {
      this._handleEscClose()
    })

    //слушатель клика на оверлей
    document.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    })
  }
}
