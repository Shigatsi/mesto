

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

  inputElement.classList.add(obj['inputErrorClass']);//'popup__input_type_error'
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
    errorElement.classList.remove(obj['errorClass']);//'popup__input-error_hidden'
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, obj) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

  inputElement.classList.remove(obj['inputErrorClass']);
  // Скрываем сообщение об ошибке
  errorElement.classList.add(obj['errorClass']);
  // Очистим ошибку
  errorElement.textContent = '';
};


//Проверка валидности полей, функция принимает массив полей
const hasInvalidInput = (inputList) =>{
  // проходим по этому массиву методом some
  return inputList.some((inputElement)=>{
    //Если поле не валидно, колбэк вернёт true
    //Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

//Переключение активации кнопки
const toggleButtonState = (inputList, buttonElement,obj)=>{
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(obj['inactiveButtonClass']);//сделать чисто переключалку мб? чекнуть перед ревью'popup__save-button_disabled'
    buttonElement.setAttribute('disabled','disabled');
  }else{
    buttonElement.classList.remove(obj['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled','disabled');
  }
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, obj) =>{
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  }else{
    hideInputError(formElement, inputElement, obj);
  };
};

// добавим слушатель всем полям ввода внутри формы
const setEventListeners = (formElement, obj)=>{
  //Находим все поля внутри формы, делаем массив
  const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));//'.popup__input'
  // Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(obj['submitButtonSelector']);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, obj);
   // Обойдем все элементы полученной коллекции
   inputList.forEach((inputElement)=>{
       // каждому полю добавим обработчик события input
       inputElement.addEventListener('input',()=>{
         isValid(formElement, inputElement, obj);
         // Вызовем toggleButtonState и передадим ей массив полей и кнопку
         toggleButtonState(inputList, buttonElement,obj);
       });
   });
};
//переберём все формы на странице:
const enableValidation = (obj) =>{
  // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));

  // Переберём полученную коллекцию
  formList.forEach((formElement)=>{
    // Для каждой формы вызовем функцию setEventListeners
    setEventListeners(formElement, obj);
  });
};

enableValidation(validationObj);
