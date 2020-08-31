import Popup from './Popup.js';

export default class PopupWithDelConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector),
    this._popupElement = document.querySelector(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__save-button');// кнопка сабмита
    this._submitButtonTextContent = this._submitButton.textContent; //сохранение текста кнопки начального
  }

  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
  }
  //публичный метод: установка слушателя
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (evt) => {
      // Эта строчка отменяет стандартную отправку формы.
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
       this._handleFormSubmit(this._card);
      //  super.closePopup()
    });
  }
    //добавление надписи Удаление...
    addBtnDeleting() {
      this._submitButton.textContent = 'Удаление...';
    }

    //удаление надписи Удаление...
    removeBtnDeleting() {
      this._submitButton.textContent = this._submitButtonTextContent;
    }


}
