const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input')

// Выбираем элемент ошибки на основе id
const formError = formElement.querySelector(`#${formInput.id}-input-error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

  inputElement.classList.add('popup__input_type_error');
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('popup__input-error_hidden');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);

  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_hidden');
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
const toggleButtonState = (inputList, buttonElement)=>{
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__save-button_disabled');//сделать чисто переключалку мб? чекнуть перед ревью
  }else{
    buttonElement.classList.remove('popup__save-button_disabled');
  }
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) =>{
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  };
};

// добавим слушатель всем полям ввода внутри формы
const setEventListeners = (formElement)=>{
  //Находим все поля внутри формы, делаем массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
   // Обойдем все элементы полученной коллекции
   inputList.forEach((inputElement)=>{
       // каждому полю добавим обработчик события input
       inputElement.addEventListener('input',()=>{
         isValid(formElement, inputElement);
         // Вызовем toggleButtonState и передадим ей массив полей и кнопку
         toggleButtonState(inputList, buttonElement);
       });
   });
};
//переберём все формы на странице:
const enableValidation = () =>{
  // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement)=>{
    // Для каждой формы вызовем функцию setEventListeners
    setEventListeners(formElement);
  });
};

enableValidation();
