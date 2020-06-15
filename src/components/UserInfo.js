import {
  profileTitle,
  profileSubtitle,
  profileAvatar
} from '../utils/constants.js';

export class UserInfo {
	constructor({ userNameSelector, aboutInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutInfoElement = document.querySelector(aboutInfoSelector);
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    this._userNameElement.value = profileTitle.textContent;
    this._aboutInfoElement.value = profileSubtitle.textContent;
  }
  // публичный метод, принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    profileTitle.textContent = formData.name; // => Сохраняем значение "Имя"
    profileSubtitle.textContent = formData.about; // => Сохраняем значение "О себе"
    profileAvatar.setAttribute('alt', formData.name); // => Изменяем "альт" аватара профиля
  }
}
