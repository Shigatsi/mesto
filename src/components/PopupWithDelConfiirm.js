import Popup from './Popup.js';

export default class PopupWithDelConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector),
    this._popupElement = document.querySelector(popupSelector);
    // this._handleFormSubmit = handleFormSubmit;//CALLBACK
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
       super.closePopup()
    });
  }
}
