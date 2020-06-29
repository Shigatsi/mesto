import {setInputsErrorClear} from '../utils/utils.js'
import {formConfig} from '../utils/constants.js'

// класс Popup, отвечает за открытие и закрытие попапа
export default class Popup {
  constructor (popupSelector) {
    this._popupElement =  document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-button');
  }


  //публичный метод: открытие окна
  openPopup() {
    this._popupElement.classList.remove('popup_hidden');
    //добавляем слушатель нажатия клавиши Esc
     document.addEventListener('keyup', (evt) => {
       this._handleEscClose(evt)
      },true);//once:true - слушатель автоматически удаляется при вызове
    //слушатель клика на оверлей
    document.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    }, true); //once:true - слушатель автоматически удаляется при вызове
    setInputsErrorClear(this._popupElement, formConfig)
  }

 //публичный метод: закрытие окна
 closePopup() {
  this._popupElement.classList.add('popup_hidden');
  document.removeEventListener('mousedown', (evt) => {
    this._handleOverlayClose(evt);
    })
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
  }
}
