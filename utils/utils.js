import {formConfig} from './constants.js';

// // очищение поля ошибок, в случае закрытия окна
// function setInputsErrorClear(form, popupCharObj ){
//   Array.from(form.querySelectorAll(popupCharObj .inputErrorSelector)).forEach(element =>{
//     element.classList.add(popupCharObj.errorClass);
//   });
// };

// //открытие окна
// export function openPopup (popupElement) {
//   togglePopupVisibility(popupElement);
//   document.addEventListener('keyup',handleEscButtonClose);
//   document.addEventListener('mousedown',closePopupOverlayClick);
//   if(popupElement.id != 'img-fullsize'){
//     setInputsErrorClear(popupElement, formConfig);
//   };
// };

// //закрытие окна
// export function closePopup (popupElement) {
//   document.removeEventListener('keyup', handleEscButtonClose);
//   document.removeEventListener('mousedown',closePopupOverlayClick);
//   togglePopupVisibility(popupElement);
// };


// //функция закрытия попапа по клику на оверлей
// function closePopupOverlayClick (evt){
//   if(evt.target.classList.contains('popup')){
//     closePopup(evt.target);
//   };
// };

// //функция изменения видимости форм
// function togglePopupVisibility(popupElement){
//   popupElement.classList.toggle('popup_hidden');
// }

// //обработчик нажатия на кнопку ESC
// function handleEscButtonClose (evt){
//   if(evt.key==='Escape'){
//     popupSection.forEach((popupElement)=>{
//       if(!popupElement.classList.contains('popup_hidden')){
//         closePopup(popupElement);
//       };
//     });
//   };
// };
