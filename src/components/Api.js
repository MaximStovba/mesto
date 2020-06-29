// Api.js
// import { Section } from '../components/Section.js';
// import { Card } from '../components/Card.js';
import { cardsList } from '../pages/index.js';
import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
//  cardListSection
} from '../utils/constants.js';

export class Api {
  constructor() {
    this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12';
    this._headers = '71b905c5-e266-4c23-af42-a4b6735dea36';
  }

  // приватный метод добавления информации о пользователе на страницу
  _setUserInfoFromServer(userInfo) {
    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    profileAvatar.alt = userInfo.name;
  }

  // приватный метод первоначальной загрузки карточек
  _setInitialCards(initialCards) {
    cardsList.renderItems(initialCards);
  }

  // публичный метод загрузки профиля пользователя с сервера
  getUserInfo() {
    fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      const userInfo = {
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      };
      this._setUserInfoFromServer(userInfo);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  // публичный метод загрузки карточек с сервера
  getInitialCards() {
    fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      this._setInitialCards(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  // публичный метод загрузки данных пользователя на сервер
  patchUserInfo(formData) {
    fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
    // console.log(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  // публичный метод добавления новой карточки
  postNewCard(formData) {
    fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.place,
        link: formData.url
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      console.log(data.owner._id);
      // отрисовка новой карточки
      cardsList.renderItems([data]);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  // публичный метод удаления своей карточки
  deleteMyCard(cardId) {
    fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }
}
