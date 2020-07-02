// PopupDeleteCard.js
import { Api } from './Api.js';
import { Popup } from './Popup.js';
import { api } from '../pages/index.js';

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
      // удаляем карточку со страницы
      this._element.querySelector('.card__trash').closest('.card').remove();
      // удаляем карточку с сервера
      api.deleteMyCard(this._cardId)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
      // закрываем форму
      super.close();
    });
  }

  // публичный метод открытия попапа
  open(delElement, cardId) {
    super.open();
    this._element = delElement;
    this._cardId = cardId;
  }
}
