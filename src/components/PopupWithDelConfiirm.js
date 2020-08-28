import Popup from './Popup.js';

export default class PopupWithDelConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector),
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;//CALLBACK
  }
  //приватный метод: установка слушателя
  _setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (evt) => {
      // Эта строчка отменяет стандартную отправку формы.
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
     // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      super.closePopup()
    });
  }
}
