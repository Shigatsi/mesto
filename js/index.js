
import {FormValidator} from './FormValidator.js';
import Card from './card.js';
import {imgForm, formConfig}  from './utils.js';
import {initialCards} from './initialCards.js';

const elemSection = document.querySelector('.elements');//сюда будут добавляться карточки
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




const formLifestyleValidation = new FormValidator(formConfig, profileForm);
formLifestyleValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(formConfig,placeForm);
formAddPlaceValidation.enableValidation();

//открытие окна
import {openPopup} from './utils.js';

//закрытие окна
import {closePopup} from './utils.js';

//подготовка к открытию формы редактирования профиля
function hendleOpenProfiler(){
  inputName.value = profileName.textContent;
  inputLifestyle.value=profileLifestyle.textContent;
  openPopup(profileForm);
}

//подготовка к открытию формы добавления карточек
function handleOpenPlace(){
  inputPlace.value = '';
  inputLink.value = '';
  openPopup(placeForm);
}

//рисуем массив начальных карточек
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
editButton.addEventListener('click', hendleOpenProfiler);

//открытие формы "Новое место"
addCardButton.addEventListener('click', handleOpenPlace);

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
