

export class FormValidator {
  constructor(formObj, formElement){
    this._formObj = formObj;
    this._formElement = formElement;
  }

  //приватный метод: добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage, formObj){
    // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

  inputElement.classList.add(formObj.inputErrorClass);//'popup__input_type_error'
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(formObj.errorClass);//'popup__input-error_hidden'
  }

  //приватный метод: удаляет класс с ошибкой
  _hideInputError(formElement, inputElement, formObj) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

    inputElement.classList.remove(formObj.inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.add(formObj.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  };

  //приватный метод: проверка валидности полей, принимает массив полей
  _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement)=>{
      //Если поле не валидно, колбэк вернёт true
      //Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  //приватный метод: переключение активации кнопки
  _toggleButtonState(inputList, buttonElement, formObj){
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(formObj.inactiveButtonClass);//popup__save-button_disabled'
      buttonElement.setAttribute('disabled','true');
    }else{
      buttonElement.classList.remove(formObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  //приватный метод: проверяет валидность поля
  _isValid(formElement, inputElement, formObj) {
    if (!inputElement.validity.valid){
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
    }else{
      this._hideInputError(formElement, inputElement, formObj);
    };
  };

  //приватный метод: добавим слушатель всем полям ввода внутри формы
  _setEventListeners (formElement, formObj) {
    //Находим все поля внутри формы, делаем массив
    const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));//'.popup__input'
    // Найдем в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(inputList, buttonElement, formObj);
     // Обойдем все элементы полученной коллекции
     inputList.forEach((inputElement)=>{
         // каждому полю добавим обработчик события input
         inputElement.addEventListener('input',()=>{
           this._isValid(formElement, inputElement, formObj);
           // Вызовем toggleButtonState и передадим ей массив полей и кнопку
           this._toggleButtonState(inputList, buttonElement, formObj);
         });
     });
  };

  //публичный метод: включает валидацию формы
  enableFormValidation() {
    this._setEventListeners(this._formElement, this._formObj);
  }

}
