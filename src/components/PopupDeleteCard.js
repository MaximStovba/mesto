// PopupDeleteCard.js

import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
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
      // удаляем карточку
      this._element.querySelector('.card__trash').closest('.card').remove();
      // закрываем форму
      super.close();
    });
  }

  // публичный метод открытия попапа
  open(delElement) {
    super.open();
    this._element = delElement;
  }
}
