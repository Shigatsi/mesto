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


//экземпляр класса Api
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: 'cf883479-ba69-4170-b793-165731887c32',
})

 Promise.all([api.getUserData(),api.getInitialCards()])
 .then (([userData, initialCards])=> {
    console.log('result', [userData, initialCards]);

    //эксземпляр UserInfo
    const userProfile = new UserInfo({
      userNameSelector:'.profile__name',
      userLifestyleSelector: '.profile__lifestyle',
      userAvatarSelector: '.profile__avatar'
    });



    userProfile.setUserInfo(userData);
    //создаём экземпля карточки
    const cardCreateFunction = (item, userId) => {
      userId = userData._id;
      const card = new Card({
        data:item,
        cardSelector:'#element-template',
        handleCardClick:(popupData)=>{
          fullSizeImg.openPopup(popupData);
        },
        deleteButtonHandler: (cardId)=>{
          popupDelete.setSubmitAction(()=>{
              cardId = item._id;
              console.log(cardId)
                api.deleteCard(cardId)
                  .then(() => {
                    card.removeCard();//it's a life!
                  })
                  .catch(err => console.error(err))//выведем ошибку
          })
          popupDelete.openPopup();


        },
        // putLikeHandler:(cardId)=>{
        //   api.putLike(cardId)
        //   .then((res)=> {
        //     console.log(res);
        //   })
        //   .catch(err => console.error(err));//выведем ошибку
        // },

        // deleteLikeHandler:()=>{
        //   //api.deleteLike(cardId)
        // }

        //   // deleteButtonHandler:(cardId)=>{
        //   //     api.deleteCard(cardId)
        //   //     .then(() => {
        //   //       card.removeCard();//it's a life!
        //   //     })
        //   //     .catch(err => console.error(err));//выведем ошибку
          // }

      });

        const cardElement = card.generateCard(userId);
        cardList.addItem(cardElement);
        return card

      }

      //создаем массив начальных карточек
      const cardList = new Section ({
        items: initialCards,
        renderer:  cardCreateFunction,

        // const cardElement = card.generateCard(),

         /* (item) => {
          const card = new Card({
            data:item,
            cardSelector:'#element-template',
            handleCardClick:(popupData)=>{
              fullSizeImg.openPopup(popupData);
            }});
          const cardElement = card.generateCard();
          cardList.addItem(cardElement, true);
          }, */
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
          cardCreateFunction(popupData);
          // const cardElement = card.generateCard();
          // cardList.addItem(cardElement, true);
        })
        .catch(err => console.error(err))//выведем ошибку
        .finally(()=>placeFormAdd.removeBtnLoading())
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
        .finally(()=>profileFormEdit.removeBtnLoading())
      }
    })
    //форма редактирования аватара
    const avatarFormEdit = new PopupWithForm({
      popupSelector:'#edit-avatar',
      handleFormSubmit:(profileData) =>{
        avatarFormEdit.addBtnLoading();
        api.patchUserAvatar(profileData.avatar_url)
        .then((data)=>{
          console.log(data)
          userProfile.setNewUserAvatar(data);
        })
        .catch(err => console.error(err))//выведем ошибку
        .finally(()=>avatarFormEdit.removeBtnLoading())
      }

    })

     //экземпляр класса PopupWithDelConfirm
     const popupDelete = new PopupWithDelConfirm (
      {
        popupSelector: "#confirm",
        // handleFormSubmit:(card)=>{
        //   console.log(card)
        //   card.getCardId;
        //   api.deleteCard(cardId)
        //     .then(() => {
        //       card.removeCard();//it's a life!
        //     })
        //     .catch(err => console.error(err));//выведем ошибку
        // }
       }
    )

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
      placeFormAdd._popupInputs.forEach((item) =>{
          item.value = '';
        })

    });

    //открытие формы "Редактируем аватар"
    avatarEditButton.addEventListener('click', ()=> {
      avatarFormEdit.openPopup();
      avatarFormEdit._popupInputs.value = '';
    })

 })
 .catch(err => console.error(err));//выведем ошибку
//

// эк-р класса Section

//создаем массив начальных карточек
// api.getInitialCards()
// .then((initialCards)=> { //initialCards - это набор карточек с сервера
//   //создаем массив начальных карточек
//   const cardList = new Section ({
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card({
//         data:item,
//         cardSelector:'#element-template',
//         handleCardClick:(popupData)=>{
//           fullSizeImg.openPopup(popupData);
//         }});
//       const cardElement = card.generateCard();
//       cardList.addItem(cardElement, true);
//       },
//     },
//     cardListSelector

//   );
//   //рисуем массив начальных карточек
// // cardList.renderItems();
// console.log(cardList);

// })
// .catch((err) => {
//   console.log(err); // выведем ошибку в консоль
// });

// //создаем массив начальных карточек
//   const cardList = new Section ({
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card({
//         data:item,
//         cardSelector:'#element-template',
//         handleCardClick:(popupData)=>{
//           fullSizeImg.openPopup(popupData);
//         }});
//       const cardElement = card.generateCard();
//       cardList.addItem(cardElement, true);
//       },
//     },
//     cardListSelector

//   );
//   //рисуем массив начальных карточек
// cardList.renderItems();

// //эксземпляр PopupWithImage
// const fullSizeImg = new PopupWithImage ('#img-fullsize');
// fullSizeImg.setEventListeners();

// //эксземпляры PopupWithForm
// //форма добавления места

// const placeFormAdd = new PopupWithForm({
//   popupSelector:'#edit-place',
//   handleFormSubmit:(placeData)=>{
//     // api.postNewCadr(placeData)
//     // .then((placeData) => {
//     //   console.log(placeData);

//     // })

//   const userCard = new Card({
//     data:{ name: inputPlace.value, link: inputLink.value, alt: inputPlace.value},
//     cardSelector:'#element-template',
//     handleCardClick:(popupData)=>{
//       fullSizeImg.openPopup(popupData);
//     }});
//     const cardElement = userCard.generateCard();
//     cardList.addItem(cardElement);
//     inputPlace.value = '';
//     inputLink.value = '';
//   }
// });
// placeFormAdd.setEventListeners();

// //эксземпляр UserInfo
// const userProfile = new UserInfo({
//   userNameSelector:'.profile__name',
//   userLifestyleSelector: '.profile__lifestyle',
//   userAvatarSelector: '.profile__avatar'
// });



// // //форма редактирования профиля
// const profileFormEdit = new PopupWithForm({
//   popupSelector: '#edit-profile',
//   handleFormSubmit:(profileData) => {
//     api.patchUserInfo(profileData)
//     .then((profileData)=> {
//       userProfile.setUserInfo(profileData);
//     })
//     .catch((err) => {
//       console.log(err); // выведем ошибку в консоль
//     });
//   }
// })


// profileFormEdit.setEventListeners();

// // //открытие формы "Редактировать профиль"
//  editButton.addEventListener('click', () => {
//   const formValues  = userProfile.getUserInfo();
//   inputName.value =  formValues.name;
//   inputLifestyle.value =  formValues.about;//.lifestyle
//   profileFormEdit.openPopup()
// });

// // //открытие формы "Новое место"
// addCardButton.addEventListener('click', () =>{
//   placeFormAdd.openPopup();
// });
