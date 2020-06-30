//класс PopupWithForm

import Popup from './Popup.js';
import { formConfig } from '../utils/constants.js';

export default class PopupWithForm extends Popup{
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector),
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;//CALLBACK
    this._errorInput = this._popupElement.querySelectorAll(formConfig.inputErrorSelector);
    this._inputsErrorClear = (popupCharObj) => {
      this._errorInput.forEach(element =>{
        element.classList.add(popupCharObj.errorClass);
      });
    }
  }

    //приватный метод: собирает данные всех полей формы
    _getInputValues (){
      // достаём все элементы полей
      this._inputList = this._popupElement.querySelectorAll('.popup__input');
      // создаём пустой объект
      this._formValues = {};
      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      // возвращаем объект значений
      return this._formValues;
    }

    //приватный метод: установка слушателя
    setEventListeners() {
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
 //публичный метод:перезаписываем родительский метод закрытия окна
    closePopup(){
      super.closePopup();
      this._popupElement.querySelector('.popup__form').reset();
      this._inputsErrorClear(formConfig);
    }
}
