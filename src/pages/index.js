//импортируем стили
import './index.css';

//импортируем модули и константы
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardListSelector,
  inputName,
  inputLifestyle,
  formConfig,
  placeForm,
  profileForm,
  EditAvatar,
  editButton,
  addCardButton,
  avatarEditButton
}  from '../utils/constants.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { data } from 'autoprefixer';
import PopupWithDelConfirm from '../components/PopupWithDelConfiirm';


const formLifestyleValidation = new FormValidator(formConfig, profileForm);
formLifestyleValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(formConfig,placeForm);
formAddPlaceValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(formConfig, EditAvatar);
formEditAvatarValidation.enableValidation();


//экземпляр класса Api
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: 'cf883479-ba69-4170-b793-165731887c32',
})

 Promise.all([api.getUserData(),api.getInitialCards()])
 .then (([userData, initialCards])=> {

    //эксземпляр UserInfo
    const userProfile = new UserInfo({
      userNameSelector:'.profile__name',
      userLifestyleSelector: '.profile__lifestyle',
      userAvatarSelector: '.profile__avatar'
    });

    userProfile.setUserInfo(userData);
    //создаём экземпля карточки
    const cardCreateFunction = (item, userId, index) => {
      const card = new Card({
        data:item,
        myId:userData._id,
        cardSelector:'#element-template',
        handleCardClick:(popupData)=>{
          fullSizeImg.openPopup(popupData);
        },
        deleteButtonHandler: (cardId)=>{
          popupDelete.openPopup(cardId);
          popupDelete.setSubmitAction(()=>{
            // popupDelete.openPopup();
            popupDelete.addBtnDeleting()
            api.deleteCard(cardId)
              .then(() => {
                card.removeCard();//it's a life!
              })
              .catch(err => console.error(err))//выведем ошибку
            .finally(()=>
              popupDelete.removeBtnDeleting(),
              popupDelete.closePopup()
            )
          })
          // popupDelete.openPopup();
        },
        putLikeHandler:(cardId)=>{
          api.putLike(cardId)
          .then((res)=> {
            card.updateLikesNum(res.likes);
          })
          .catch(err => console.error(err));//выведем ошибку
        },

        deleteLikeHandler:(cardId)=>{
          api.deleteLike(cardId)
          .then((res)=> {
            card.updateLikesNum(res.likes);
          })
          .catch(err => console.error(err));//выведем ошибку
        }
      });

        const cardElement = card.generateCard(userId, true);
        if (index === true){
          cardList.addItem(cardElement);
        } else {
          cardList.addUserItem(cardElement);
        }
        // cardList.addItem(cardElement, true);
        return card

      }

      //создаем массив начальных карточек
      const cardList = new Section ({
        items: initialCards,
        renderer:  cardCreateFunction,
        },
        cardListSelector
      );

    // //эксземпляр PopupWithImage
    const fullSizeImg = new PopupWithImage ('#img-fullsize');
    //форма добавления места
    const placeFormAdd = new PopupWithForm({
      popupSelector:'#edit-place',
      handleFormSubmit:(popupData)=>{
      placeFormAdd.addBtnLoading();
        api.postNewCadr(popupData)
        .then ((popupData)=>{
          cardCreateFunction(popupData, false);
          // const cardElement = card.generateCard();
          // cardList.addItem(cardElement, true);
        })
        .catch(err => console.error(err))//выведем ошибку
        .finally(()=>
        placeFormAdd.removeBtnLoading(),
        placeFormAdd.closePopup()
        )
      }
    });

   //форма редактирования профиля
    const profileFormEdit = new PopupWithForm({
      popupSelector: '#edit-profile',
      handleFormSubmit:(profileData) => {
        profileFormEdit.addBtnLoading();
        api.patchUserInfo(profileData)
        .then((profileData)=> {
          userProfile.setUserInfo(profileData);
        })
        .catch(err => console.error(err))//выведем ошибку
        .finally(()=>
        profileFormEdit.removeBtnLoading(),
        profileFormEdit.closePopup()
        )
      }
    })
    //форма редактирования аватара
    const avatarFormEdit = new PopupWithForm({
      popupSelector:'#edit-avatar',
      handleFormSubmit:(profileData) =>{
        avatarFormEdit.addBtnLoading();
        api.patchUserAvatar(profileData.avatar_url)
        .then((data)=>{
          userProfile.setNewUserAvatar(data);
        })
        .catch(err => console.error(err))//выведем ошибку
        .finally(()=>
        avatarFormEdit.removeBtnLoading(),
        avatarFormEdit.closePopup()
        )
      }
    });

     //экземпляр класса PopupWithDelConfirm
     const popupDelete = new PopupWithDelConfirm (
      {popupSelector: "#confirm"});

    return {
      userProfile,
      cardList,
      fullSizeImg,
      placeFormAdd,
      profileFormEdit,
      popupDelete,
      avatarFormEdit
    }
  })

 .then ((res) => {
    const {userProfile, cardList, fullSizeImg, placeFormAdd, profileFormEdit, popupDelete, avatarFormEdit, } = res;
    fullSizeImg.setEventListeners();
    placeFormAdd.setEventListeners();
    profileFormEdit.setEventListeners();
    popupDelete.setEventListeners();
    avatarFormEdit.setEventListeners();

    //рисуем массив начальных карточек
    cardList.renderItems();

    //открытие формы "Редактировать профиль"
    editButton.addEventListener('click', () => {
      const formValues  = userProfile.getUserInfo();
      inputName.value =  formValues.name;
      inputLifestyle.value =  formValues.about;//.lifestyle
      profileFormEdit.openPopup()
    });


    //открытие формы "Новое место"
    addCardButton.addEventListener('click', () =>{
      placeFormAdd.openPopup();
      placeFormAdd.clearInputsValues();
    });

    //открытие формы "Редактируем аватар"
    avatarEditButton.addEventListener('click', ()=> {
      avatarFormEdit.openPopup();
      avatarFormEdit.clearInputsValues();
    })
 })
 .catch(err => console.error(err));//выведем ошибку
