
export const imgForm = document.querySelector('#img-fullsize');//форма просмотра полноразмерного изображения

export const fullsizeImg = document.querySelector('.popup__fullsize-img');//полноразмерное изображение
export const fullsizeImgCaption = document.querySelector('.popup__fullsize-img-caption');// подпись для полноразмерного изображения

export const popupSection = Array.from(document.querySelectorAll('.popup'));//секция с формами

//объект настроек с селекторами и классами формы
export const formConfig = {
 formSelector: '.popup__form',
 inputSelector: '.popup__input',
 inputErrorSelector:'.popup__input-error',
 submitButtonSelector: '.popup__save-button',
 inactiveButtonClass: 'popup__save-button_disabled',
 inputErrorClass: 'popup__input_type_error',
 errorClass: 'popup__input-error_hidden'
}

// очищение поля ошибок, в случае закрытия окна
function setInputsErrorClear(form, popupCharObj ){
  Array.from(form.querySelectorAll(popupCharObj .inputErrorSelector)).forEach(element =>{
    element.classList.add(popupCharObj.errorClass);
  });
};

//открытие окна
export function openPopup (popupElement) {
  togglePopupVisibility(popupElement);
  document.addEventListener('keyup',setEscButtonHandler);
  document.addEventListener('mousedown',closePopupOverlayClick);
  if(popupElement.id != 'img-fullsize'){
    setInputsErrorClear(popupElement, formConfig);
  };
};

//закрытие окна
export function closePopup (popupElement) {
  document.removeEventListener('keyup', setEscButtonHandler);
  document.removeEventListener('mousedown',closePopupOverlayClick);
  togglePopupVisibility(popupElement);
};


//функция закрытия попапа по клику на оверлей
function closePopupOverlayClick (evt){
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target);
  };
};

//функция изменения видимости форм
function togglePopupVisibility(popupElement){
  popupElement.classList.toggle('popup_hidden');
}

//обработчик нажатия на кнопку ESC
function setEscButtonHandler (evt){
  if(evt.key==='Escape'){
    popupSection.forEach((popupElement)=>{
      if(!popupElement.classList.contains('popup_hidden')){
        closePopup(popupElement);
      };
    });
  };
};
