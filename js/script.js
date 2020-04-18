const editButton = document.querySelector('.profile__editButton');
const closeButton = document.querySelector('.popup__closeButton');
console.log(closeButton);
let popupStatus = document.querySelector('.popup');

popupStatus.classList.add('popup_staus_closed');

function showPopup() {
  console.log('Мы кликнули по editButton');
  popupStatus.classList.remove('popup_staus_closed');
  popupStatus.classList.add('popup_staus_opened');
}

function hidePopup(){
  console.log('Мы кликнули по closeButton');
  popupStatus.classList.add('popup_staus_closed');
  popupStatus.classList.remove('popup_staus_opened');
};

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
