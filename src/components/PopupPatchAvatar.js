// PopupPatchAvatar.js

import { Api } from './Api.js';
import { Popup } from './Popup.js';
import { api } from '../pages/index.js';

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
      const avatarUrl = document.querySelector('.popup__text_type_avatar-url').value;
      console.log(avatarUrl);
      api.patchAvatar(avatarUrl);
      // закрываем форму
      super.close();
    });
  }
}
