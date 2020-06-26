export default class UserInfo {
  constructor (userNameSelector, userLifestyleSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userLifestyle = document.querySelector(userLifestyleSlector);
  }

  //публичный метод: возвращает объект с данными пользователя
  getUserInfo() {
    const userName = this._userName.textContent;
    const userLifestyle = this._userLifestyle.textContent;
    return [userName, userLifestyle];
  }

  //публичный метод: принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._userName.textContent = userName;
    this._userLifestyle.textContent = userLifestyle;
  }
}
