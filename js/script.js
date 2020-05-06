const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const overlay = document.querySelector('.overlay');
//сюда будут добавляться карточки
const elemSection = document.querySelector('.elements');
// Находим форму в DOM
let popupStatus = document.querySelector('.popup');
let inputName = document.getElementById('popup_name');
let inputLifestyle = document.getElementById('popup_lifestyle');
let profileName = document.querySelector('.profile__name');
let profileLifestyle = document.querySelector('.profile__lifestyle');

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


//функция для карточек из "коробки"
function addCards (card){
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = card.name;
  cardElement.querySelector('.elements__image').src=card.link;
  cardElement.querySelector('.elements__image').alt = card.alt;
  elemSection.append(cardElement);
}

//вывод карточек на страницу
initialCards.forEach(addCards);

function showOverlay(){
  overlay.classList.remove('overlay_status_hide');
  overlay.classList.add('overlay_staus_seen');
};

function hideOverlay(){
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};

function showPopup() {
  showOverlay();
  popupStatus.classList.remove('popup_status_closed');
  popupStatus.classList.add('popup_status_opened');
  inputName.value = profileName.textContent;
  inputLifestyle.value = profileLifestyle.textContent;
}

function hidePopup(){
  hideOverlay();
  popupStatus.classList.add('popup_status_closed');
  popupStatus.classList.remove('popup_status_opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  // Получите значение полей из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = inputName.value;
  profileLifestyle.textContent = inputLifestyle.value;
  hidePopup();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupStatus.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
