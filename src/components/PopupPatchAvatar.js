// PopupPatchAvatar.js

import { Api } from './Api.js';
import { Popup } from './Popup.js';
import { api, renderLoading } from '../pages/index.js';
import {
  patchButton
  } from '../utils/constants.js';

export class PopupPatchAvatar extends Popup {
	constructor({ formSelector }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
  }
  // публичный метод добавления слушателей
  setEventListeners() {
    super.setEventListeners();
    // обработчик сабмита формы
    this._popupElement.addEventListener('submit', (evt) => {
      // отменяем стандартную отправку формы
      evt.preventDefault();
      // меняем название кнопки сабмита при загрузке данных на сервис
      renderLoading(true, 'patchAvatar', patchButton);
      // обновляем аватар пользователя на сервере
      const avatarUrl = document.querySelector('.popup__text_type_avatar-url').value;
      api.patchAvatar(avatarUrl, patchButton);
      // закрываем форму
      super.close();
    });
  }
}
