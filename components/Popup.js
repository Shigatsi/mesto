// класс Popup, отвечает за открытие и закрытие попапа

export default class Popup {
  constructor (popupSelector) {
    this._popupElement =  document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-button');
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
  _handleEscClose(evt) {
    if(evt.key==='Escape') {
      this.closePopup();
    }
  }
  //приватный метод: закрытие попапа по клику на оверлей
  _handleOverlayClose(evt){
    if(evt.target.classList.contains('popup')){
      this.closePopup();
    };
  };

  //публичный метод: добавляет слушатели
  setEventListeners() {
    //слушатель клика по иконке закрытия попапа
    this._popupCloseBtn.addEventListener('click', () =>{
      this.closePopup()
    })
    //слушатель нажатия клавиши Esc
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    })

    //слушатель клика на оверлей
    document.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    })
  }
}