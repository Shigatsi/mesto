const editButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const overlay = document.querySelector('.overlay');//затемнение страницы при открытии формы
const addCardButton = document.querySelector('.profile__add-button');//кнопка добавления новой формы
const profileForm = document.querySelector('#edit-profile');//форма редактирования профиля
const placeForm = document.querySelector('#edit-place');//форма редактирования места
const elementTemplate = document.querySelector('#element-template').content;//темплейт в DOM вызов по ID
const elemSection = document.querySelector('.elements');//сюда будут добавляться карточки
let popupStatus = document.querySelector('.popup');// Находим форму в DOM
let inputName = document.getElementById('popup_name');//ввод имени профиля
let inputLifestyle = document.getElementById('popup_lifestyle');// ввод професси в профиле
let inputPlace = document.querySelector('#popup_place');//ввод названия места
let inputLink = document.querySelector('#popup_link');//ввод ссылки на фото места


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


//создаем карточки
function createCards (card){
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = card.name;
  cardElement.querySelector('.elements__image').src=card.link;
  cardElement.querySelector('.elements__image').alt = card.alt;
  //кнопка лайк.событие клик
  cardElement.querySelector('.elements__like-button').addEventListener('click',setLikeActive);
  //кнопка корзина.событие клик
  cardElement.querySelector('.elements__rbin-button').addEventListener('click',deletButtonHandler);
  elemSection.append(cardElement);
}

//рендерим карточки
function renderCards (){
  initialCards.forEach(createCards);

}

//выводим карточки
renderCards();

//like
function setLikeActive(event){
  event.target.classList.add('elements__like-button_active',true);
};

//delete
function deletButtonHandler(event){
  console.log(event.target.closest('.elements__item'));
  event.target.closest('.elements__item').remove();
}

//функция для карточек из "коробки"
//ниже все работает (просто надо немного поэксперементировать)
// function addCards (card){
//   const elementTemplate = document.querySelector('#element-template').content;
//   const cardElement = elementTemplate.cloneNode(true);
//   cardElement.querySelector('.elements__title').textContent = card.name;
//   cardElement.querySelector('.elements__image').src=card.link;
//   cardElement.querySelector('.elements__image').alt = card.alt;
//   //like
//   cardElement.querySelector('.elements__like-button').addEventListener('click', function(event){
//     event.target.classList.add('elements__like-button_active',true);
//   })

//   //delete
//   cardElement.querySelector('.elements__rbin-button');
//   addEventListener('click', function(evt){
//     console.log(evt);
//    event.target.parent.remove();
//   })
//   elemSection.append(cardElement);
// }

// //вывод карточек на страницу
// initialCards.forEach(addCards);





function showOverlay(){
  overlay.classList.remove('overlay_status_hide');
  overlay.classList.add('overlay_staus_seen');
};

function hideOverlay(){
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};

function setClosePopupHandler(){
  hideOverlay();
  popupStatus.classList.add('popup_status_closed');
  popupStatus.classList.remove('popup_status_opened');
};

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                         // Так мы можем определить свою логику отправки.
//                         // О том, как это делать, расскажем позже.
//   // Получите значение полей из свойства value
//   // Выберите элементы, куда должны быть вставлены значения полей
//   // Вставьте новые значения с помощью textContent
//   profileName.textContent = inputName.value;
//   profileLifestyle.textContent = inputLifestyle.value;
//   setClosePopupHandler();
// };

// function setOpenProfileFormHandler(){
//   showOverlay();
//   profileForm.classList.add('popup_status_opened');
//   inputName.value = profileName.textContent;
//   inputLifestyle.value = profileLifestyle.textContent;
// }

function setOpenPlaceFormHandler(){
  showOverlay()
  placeForm.classList.add('popup_status_opened');
}

//обработчик события, добавляем новые карточки it's a life!!!!!!
function formPlaceSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const card = createCards({name: inputPlace.value, link: inputLink.value});
    console.log(inputPlace.value, inputLink.value);
    elemSection.prepend(card);
    inputPlace.value = '';
    inputLink.value = '';
    setClosePopupHandler();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// popupStatus.addEventListener('submit', formSubmitHandler);
popupStatus.addEventListener('submit', formPlaceSubmitHandler);
//editButton.addEventListener('click',setOpenProfileFormHandler);
addCardButton.addEventListener('click', setOpenPlaceFormHandler);
document.querySelectorAll('.popup__close-button').forEach(function(closeButton){
  closeButton.addEventListener('click', function(event){
    console.log(event);
    event.setClosePopupHandler();
  });
});
