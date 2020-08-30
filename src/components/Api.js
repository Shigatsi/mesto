
//конструктор API
export default class Api {
  constructor ({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // публичный метод загрузки информации о пользователе
  getUserData () {
    return fetch(this.baseUrl + '/users/me', {
      headers: {
        authorization: this.headers
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //публичный метод загрузки карточек
  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: {
        authorization:  this.headers
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  //публичный метод сохранения отредактированных данных профиля
  patchUserInfo(popupData) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization:  this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: popupData.name,
      about: popupData.about
     })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);

    })
  }

  //публичный метод добавления новой карточки
  postNewCadr (popupData) {
   return fetch (this.baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: this.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: popupData.place,
      link:popupData.place_url
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //публичный метод удоления карточки
  deleteCard (cardId) {
    return fetch (this.baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this.headers,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

   //публичный метод постановки лайка
   putLike (cardId) {
    return fetch (this.baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: {
        authorization: this.headers,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //публичный метод удоления лайка
  deleteLike (cardId) {
    return fetch (this.baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this.headers,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //публичный метод обновления аватара пользователя
  patchUserAvatar (userAvatarUrl) {
    return fetch (this.baseUrl + '/users/me/avatar/', {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
        authorization: this.headers,
      },
      body: JSON.stringify({
        avatar: userAvatarUrl,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();

      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.error(err));//выведем ошибку
  }
}
