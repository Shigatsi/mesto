const editButton = document.querySelector('.profile__editButton');
const closeButton = document.querySelector('.popup__closeButton');
let popupStatus = document.querySelector('.popup');
let inputName = document.querySelector('.popup__name');
let inputLifestyle = document.querySelector('.popup__lifestyle');
let Name = document.querySelector('.profile__name');
let Lifestyle = document.querySelector('.profile__lifestyle');


popupStatus.classList.add('popup_staus_closed');

function showPopup() {
  console.log('Мы кликнули по editButton');
  popupStatus.classList.remove('popup_staus_closed');
  popupStatus.classList.add('popup_staus_opened');
  inputName.value = Name.textContent;
  inputLifestyle.value = Lifestyle.textContent;
}

function hidePopup(){
  console.log('Мы кликнули по closeButton');
  popupStatus.classList.add('popup_staus_closed');
  popupStatus.classList.remove('popup_staus_opened');
};


function formSubmitHandler (evt) {
  evt.preventDefault();
  Name.textContent = inputName.value;
  Lifestyle.textContent = inputLifestyle.value;
  popupStatus.classList.add('popup_staus_closed');
  popupStatus.classList.remove('popup_staus_opened');


};

popupStatus.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
