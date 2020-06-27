import {
  inputName,
  inputLifestyle
} from '../utils/constants.js';

export default class UserInfo {
  constructor ({userNameSelector, userLifestyleSelector}) {
    this._userName = document.querySelector(userNameSelector);
    console.log( this._userName);
    this._userLifestyle = document.querySelector(userLifestyleSelector);
  }

  //публичный метод: возвращает объект с данными пользователя
  getUserInfo() {
    this._formValues = {};
    this._formValues[inputName.name] =  this._userName.textContent;
    this._formValues[inputLifestyle.name] = this._userLifestyle.textContent;
    console.log(this._formValues);
    return this._formValues;
  }

  //публичный метод: принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(profileData) {
    this._userName.textContent = profileData.name;
    this._userLifestyle.textContent = profileData.name;
  }
}
