const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const overlay = document.querySelector('.overlay');
// let form = document.querySelector('.popup__form');
let popupStatus = document.querySelector('.popup');
let inputName = document.getElementById('popup_name');
let inputLifestyle = document.getElementById('popup_lifestyle');
let Name = document.querySelector('.profile__name');
let Lifestyle = document.querySelector('.profile__lifestyle');


popupStatus.classList.add('popup_status_closed');
overlay.classList.add('overlay_status_hide');

function showPopup() {
  popupStatus.classList.remove('popup_status_closed');
  popupStatus.classList.add('popup_status_opened');
  overlay.classList.remove('overlay_status_hide');
  overlay.classList.add('overlay_staus_seen');
  inputName.value = Name.textContent;
  inputLifestyle.value = Lifestyle.textContent;
}

function hidePopup(){
  popupStatus.classList.add('popup_status_closed');
  popupStatus.classList.remove('popup_status_opened');
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};


function formSubmitHandler (evt) {
  evt.preventDefault();
  Name.textContent = inputName.value;
  Lifestyle.textContent = inputLifestyle.value;
  popupStatus.classList.add('popup_status_closed');
  popupStatus.classList.remove('popup_status_opened');
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};

popupStatus.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
