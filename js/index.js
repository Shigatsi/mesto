
import {FormValidator} from './FormValidator.js';

import Card from './card.js';

import {imgForm, popupSection, formConfig}  from './utils.js';
const elementTemplate = document.querySelector('#element-template').content;//темплейт в DOM вызов по ID
const elemSection = document.querySelector('.elements');//сюда будут добавляться карточки

//create forms massive


const profileForm = document.querySelector('#edit-profile');//форма редактирования профиля
const editButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const closeProfileFormBtn = document.querySelector('#profile-close');//кнопка закрытия формы ред профиля

const closeImgFormBtn = document.querySelector('#img-close');//кнопка закрытия формы просмотра изображения
const placeForm = document.querySelector('#edit-place');//форма добавления места
const addCardButton = document.querySelector('.profile__add-button');//кнопка добавления нового места
const closePlaceFormBtn = document.querySelector('#place-close');//кнопка закрытия формы добавления места


const profileName = document.querySelector('.profile__name');//имя профиля
const profileLifestyle = document.querySelector('.profile__lifestyle');//профессия профиля
const inputName = document.getElementById('popup_name');//ввод имени профиля
const inputLifestyle = document.getElementById('popup_lifestyle');// ввод професси в профиле
const inputPlace = document.querySelector('#popup_place');//ввод названия места
const inputLink = document.querySelector('#popup_link');//ввод ссылки на фото места

//"коробка" с карточками изначальными
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'горная долина'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'лесное озеро зимой'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'панельные дома'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'сопка в далеке'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'железная дорога через лес'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'крутой обрыв у замерзшего озера'
  }
];




const formLifestyleValidation = new FormValidator(formConfig, profileForm);
formLifestyleValidation.enableFormValidation();

const formAddPlaceValidation = new FormValidator(formConfig,placeForm);
formAddPlaceValidation.enableFormValidation();

//close popup func by Esc-button
function closePopupEscKeyUp(){
  popupSection.forEach((popupElement)=>{
    if(!popupElement.classList.contains('popup_hidden')){
      closePopup(popupElement);
    };
  document.removeEventListener('keyup', setEscButtonHandler);
  });
};

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


//открытие окна
import {openPopup} from './utils.js';

//закрытие окна
import {closePopup} from './utils.js';

//подготовка к открытию формы редактирования профиля
function setOpenProfileHandler(){
  inputName.value = profileName.textContent;
  inputLifestyle.value=profileLifestyle.textContent;
  openPopup(profileForm);
}

//подготовка к открытию формы добавления карточек
function setOpenPlaceHandler(){
  inputPlace.value = '';
  inputLink.value = '';
  openPopup(placeForm);
}

// //функция закрытия попапа по клику на оверлей
// function closePopupOverlayClick (evt){
//   if(evt.target.classList.contains('popup')){
//     closePopup(evt.target);
//   }
// }

initialCards.forEach((item)=>{
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();

  elemSection.append(cardElement);
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  // Получите значение полей из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = inputName.value;
  profileLifestyle.textContent = inputLifestyle.value;
  closePopup(profileForm);
};

//обработчик события, добавляем новые карточки it's a life!!!!!!
function formPlaceSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const userCard = new Card ({name: inputPlace.value, link: inputLink.value, alt: inputPlace.value}, '#element-template')
    const cardElement = userCard.generateCard();
    elemSection.prepend(cardElement);
    inputPlace.value = '';
    inputLink.value = '';
    closePopup(placeForm);
};

//открытие формы "Редактировать профиль"
editButton.addEventListener('click', setOpenProfileHandler);

//открытие формы "Новое место"
addCardButton.addEventListener('click', setOpenPlaceHandler);

//закрытие формы "Редактировать профиль"
closeProfileFormBtn.addEventListener('click',() => {
  closePopup(profileForm);
});

//закрытие формы "Новое место"
closePlaceFormBtn.addEventListener('click',() =>{
  closePopup(placeForm);

});

//закрытие формы просмотра изображения
closeImgFormBtn.addEventListener('click', ()=> {
  closePopup(imgForm);
});

//добавление карточки
placeForm.addEventListener('submit',formPlaceSubmitHandler);


//редактирование профиля
profileForm.addEventListener('submit', formProfileSubmitHandler);
