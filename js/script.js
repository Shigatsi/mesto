const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const overlay = document.querySelector('.overlay');
// let form = document.querySelector('.popup__form');
let popupStatus = document.querySelector('.popup');
let inputName = document.getElementById('popup_name');
let inputLifestyle = document.getElementById('popup_lifestyle');
let profileName = document.querySelector('.profile__name');
let profileLifestyle = document.querySelector('.profile__lifestyle');

function showPopup() {
  popupStatus.classList.remove('popup_status_closed');
  popupStatus.classList.add('popup_status_opened');
  overlay.classList.remove('overlay_status_hide');
  overlay.classList.add('overlay_staus_seen');
  inputName.value = profileName.textContent;
  inputLifestyle.value = profileLifestyle.textContent;
}

function hidePopup(){
  popupStatus.classList.add('popup_status_closed');
  popupStatus.classList.remove('popup_status_opened');
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileLifestyle.textContent = inputLifestyle.value;
  hidePopup;
  // popupStatus.classList.add('popup_status_closed');
  // popupStatus.classList.remove('popup_status_opened');
  overlay.classList.add('overlay_status_hide');
  overlay.classList.remove('overlay_status_seen');
};

popupStatus.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
