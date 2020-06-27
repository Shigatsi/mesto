
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  profileName,
  cardListSelector,
  inputName,
  inputLifestyle,
  profileLifestyle,
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
import UserInfo from '../components/UserInfo.js';



const formLifestyleValidation = new FormValidator(formConfig, profileForm);
formLifestyleValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(formConfig,placeForm);
formAddPlaceValidation.enableValidation();



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
    cardList.addItem(cardElement, true);
    },
  },
  cardListSelector
);
//рисуем массив начальных карточек
cardList.renderItems();


//эксземпляр PopupWithImage
const fullSizeImg = new PopupWithImage ('#img-fullsize');
fullSizeImg.setEventListeners();

//эксземпляры PopupWithForm
//форма добавления места
const placeFormAdd = new PopupWithForm({
  popupSelector:'#edit-place',
  handleFormSubmit:()=>{
  const userCard = new Card({
    data:{ name: inputPlace.value, link: inputLink.value, alt: inputPlace.value},
    cardSelector:'#element-template',
    handleCardClick:(popupData)=>{
      fullSizeImg.openPopup(popupData);
    }});
    const cardElement = userCard.generateCard();
    cardList.addItem(cardElement);
    inputPlace.value = '';
    inputLink.value = '';
  }
});
placeFormAdd.setEventListeners();

//эксземпляр UserInfo
const userProfile = new UserInfo({
  userNameSelector:'.profile__name',
  userLifestyleSelector: '.profile__lifestyle'});



//форма редактирования профиля
const profileFormEdit = new PopupWithForm({
  popupSelector: '#edit-profile',
  handleFormSubmit:(profileData) => {
    userProfile.setUserInfo(profileData);
  }
});
profileFormEdit.setEventListeners();

// //открытие формы "Редактировать профиль"
 editButton.addEventListener('click', () => {
  const formValues  = userProfile.getUserInfo();
  console.log(formValues);
  inputName.value =  formValues.name;
  inputLifestyle.value =  formValues.lifestyle;
  profileFormEdit.openPopup()
});

// //открытие формы "Новое место"
addCardButton.addEventListener('click', () =>{
  placeFormAdd.openPopup();
});
