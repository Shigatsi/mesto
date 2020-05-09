const elementTemplate = document.querySelector('#element-template').content;//темплейт в DOM вызов по ID
const elemSection = document.querySelector('.elements');//сюда будут добавляться карточки

const overlay = document.querySelector('.overlay');//затемнение страницы при открытии формы

const profileForm = document.querySelector('#edit-profile');//форма редактирования профиля
const editButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const closeProfileFormBtn = document.querySelector('#profile-close');//кнопка закрытия формы ред профиля
const submitProfileFormBtn = document.querySelector('#profile-submit');//кнопка сохранения изменений профиля

const placeForm = document.querySelector('#edit-place');//форма добавления места
const addCardButton = document.querySelector('.profile__add-button');//кнопка добавления нового места
const closePlaceFormBtn = document.querySelector('#place-close');//кнопка закрытия формы добавления места
const submitPlaceFormBtn = document.querySelector('#place-submit');//кнопка сохранения нового места


const profileName = document.querySelector('.profile__name');//имя профиля
const profileLifestyle = document.querySelector('.profile__lifestyle');//профессия профиля
const inputName = document.getElementById('popup_name');//ввод имени профиля
const inputLifestyle = document.getElementById('popup_lifestyle');// ввод професси в профиле
const inputPlace = document.querySelector('#popup_place');//ввод названия места
const inputLink = document.querySelector('#popup_link');//ввод ссылки на фото места

const imgForm = document.querySelector('#img-fullsize');//форма просмотра полноразмерного изображения
const closeImgFormBtn = document.querySelector('#img-close');//кнопка закрытия формы просмотра изображения
const fullsizeImg = document.querySelector('.popup__fullsize-img');//полноразмерное изображение
const fullsizeImgCaption = document.querySelector('.popup__fullsize-img-caption');// подпись для полноразмерного изображения


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
  cardElement.querySelector('.elements__like-button').addEventListener('click',toggleLikeActive);
  //кнопка корзина.событие клик
  cardElement.querySelector('.elements__rbin-button').addEventListener('click',deletButtonHandler);
  //кнопка-изображение для открытия формы просмотра фото
  cardElement.querySelector('.elements__image').addEventListener('click', setOpenPlaceImageHandler);

  elemSection.prepend(cardElement);//задать чтобы изначальные карточки загрпужались отдельно?! но как?
  return cardElement;
}

//рендерим карточки
function renderCards (){
  initialCards.forEach(createCards);
}

//выводим карточки
renderCards();

//like
function toggleLikeActive(event){
  event.target.classList.toggle('elements__like-button_active');
};

//delete
function deletButtonHandler(event){
  event.target.closest('.elements__item').remove();//otvalbashki
}

//fullsize
function setOpenPlaceImageHandler(event){
  fullsizeImg.src = event.target.src;
  fullsizeImgCaption.textContent = event.target.nextElementSibling.firstElementChild.textContent;
  openPopup(event.target);
}



//показать затемнение
function showOverlay(){
  overlay.classList.remove('overlay_status_hide');
  overlay.classList.add('overlay_staus_seen');
};

//скрыть затемнение
function hideOverlay(){
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};

//функция открытия форм
function openPopup(btn){
  showOverlay()
  if (btn.classList.contains('profile__edit-button')){
    inputName.value = profileName.textContent;
    inputLifestyle.value = profileLifestyle.textContent;
    profileForm.classList.add('popup_opened');

  }
  if (btn.classList.contains('profile__add-button')){
    placeForm.classList.add('popup_opened');
  }
  if(btn.classList.contains('elements__image')){
    imgForm.classList.add('popup_opened');
  }
};

//функция закрытия форм
function ClosePopup(btn){
  hideOverlay();
  if(btn.id = 'profile-close'){
    profileForm.classList.remove('popup_opened');
  }
  if(btn.id='place-close'){
    placeForm.classList.remove('popup_opened');
  }
  if(btn.id='img-close'){
    imgForm.classList.remove('popup_opened');
}
}



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
  ClosePopup(evt.target);
};

//обработчик события, добавляем новые карточки it's a life!!!!!!
function formPlaceSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const card = createCards({name: inputPlace.value, link: inputLink.value});
    elemSection.append(card);
    inputPlace.value = '';
    inputLink.value = '';
    ClosePopup(evt.target);
};

//открытие формы "Редактировать профиль"
editButton.addEventListener('click', function (event) {
  openPopup(event.target);
})

//открытие формы "Новое место"
addCardButton.addEventListener('click', function (event) {
  openPopup(event.target);
})

//закрытие формы "Редактировать профиль"
closeProfileFormBtn.addEventListener('click', function (event) {
  ClosePopup(event.target);
})

//закрытие формы "Новое место"
closePlaceFormBtn.addEventListener('click', function (event) {
  ClosePopup(event.target);
})

//закрытие формы просмотра изображения
closeImgFormBtn.addEventListener('click', function (event) {
  ClosePopup(event.target);
})

//добавление карточки
placeForm.addEventListener('submit',formPlaceSubmitHandler);


//редактирование профиля
profileForm.addEventListener('submit', formProfileSubmitHandler);
