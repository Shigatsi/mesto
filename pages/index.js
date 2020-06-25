
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardListSelector,
  elemSection,
  initialCards,
  imgForm,
  formConfig,
  placeForm,
  profileForm,
  editButton,
  addCardButton,
  closeProfileFormBtn,
  closePlaceFormBtn,
  closeImgFormBtn,
  inputPlace,
  inputLink
}  from '../utils/constants.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';





const formLifestyleValidation = new FormValidator(formConfig, profileForm);
formLifestyleValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(formConfig,placeForm);
formAddPlaceValidation.enableValidation();

// //открытие окна
// import {openPopup} from '../utils/utils.js';

// //закрытие окна
// import {closePopup} from '../utils/utils.js';

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

//создаем массив начальных карточек
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data:item,
      cardSelector:'#element-template',
      handleCardClick:(popupData)=>{
        fullSizeImg.openPopup(popupData);
      }});
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    },
  },
  cardListSelector
);
//рисуем массив начальных карточек
cardList.renderItems();


//эксземпляр PopupWithImage
const fullSizeImg = new PopupWithImage ('#img-fullsize');
console.log(fullSizeImg);
fullSizeImg.setEventListeners();

//эксземпляры PopupWithForm
//форма добавления места
const placeFormAdd = new PopupWithForm({
  popupSelector:'#edit-place',
  handleFormSubmit:(popupData)=>{
    cardList.renderItems([{ name: popupData.place, link: popupData.url }])
  }
});
placeFormAdd.setEventListeners();



// //рисуем массив начальных карточек
// initialCards.forEach((item)=>{
//   const card = new Card(item, '#element-template');
//   const cardElement = card.generateCard();

//   elemSection.append(cardElement);
// })

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// function formProfileSubmitHandler (evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                         // Так мы можем определить свою логику отправки.
//                         // О том, как это делать, расскажем позже.
//   // Получите значение полей из свойства value
//   // Выберите элементы, куда должны быть вставлены значения полей
//   // Вставьте новые значения с помощью textContent
//   profileName.textContent = inputName.value;
//   profileLifestyle.textContent = inputLifestyle.value;
//   closePopup(profileForm);
// };

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

// //открытие формы "Редактировать профиль"
// editButton.addEventListener('click', hendleOpenProfiler);

// //открытие формы "Новое место"
addCardButton.addEventListener('click', () => placeFormAdd.openPopup());

// //закрытие формы "Редактировать профиль"
// closeProfileFormBtn.addEventListener('click',() => {
//   closePopup(profileForm);
// });

// //закрытие формы "Новое место"
// closePlaceFormBtn.addEventListener('click',() =>{
//   closePopup(placeForm);

// });

// //закрытие формы просмотра изображения
// closeImgFormBtn.addEventListener('click', ()=> {
//   closePopup(imgForm);
// });

// //добавление карточки
// placeForm.addEventListener('submit',formPlaceSubmitHandler);


// //редактирование профиля
// profileForm.addEventListener('submit', formProfileSubmitHandler);
