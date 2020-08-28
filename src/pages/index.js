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
  inputPlace,
  inputLink
}  from '../utils/constants.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { data } from 'autoprefixer';


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
        deleteButtonHandler:(cardId)=>{
            api.deleteCard(cardId)
            .then(() => {
              card.removeCard();//it's a life!
            })
            .catch(err => console.error(err));//выведем ошибку
        }
      });

        const cardElement = card.generateCard(userId);
        cardList.addItem(cardElement,true);

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
        console.log(popupData);
        api.postNewCadr(popupData)
        .then ((popupData)=>{
          cardCreateFunction(popupData);
          // const cardElement = card.generateCard();
          // cardList.addItem(cardElement, true);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      }
    });

   //форма редактирования профиля
    const profileFormEdit = new PopupWithForm({
      popupSelector: '#edit-profile',
      handleFormSubmit:(profileData) => {
        api.patchUserInfo(profileData)
        .then((profileData)=> {
          userProfile.setUserInfo(profileData);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      }
    })

    return {
      userProfile,
      cardList,
      fullSizeImg,
      placeFormAdd,
      profileFormEdit
    }
  })
 .then ((res) => {
    const {userProfile, cardList, fullSizeImg, placeFormAdd, profileFormEdit} = res;
    fullSizeImg.setEventListeners();
    placeFormAdd.setEventListeners();
    profileFormEdit.setEventListeners();

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
    });

 })
 .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
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
