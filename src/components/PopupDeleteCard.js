// PopupDeleteCard.js
import { Api } from './Api.js';
import { Popup } from './Popup.js';
import { api } from '../pages/index.js';

export class PopupDeleteCard extends Popup {
	constructor({ formSelector }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleSubmitDelCard = this._handleSubmitDelCard.bind(this);
  }

// приватный метод обработки сабмита формы
_handleSubmitDelCard(evt) {
  // отменяем стандартную отправку формы
  evt.preventDefault();
  // удаляем карточку с сервера
  api.deleteMyCard(this._cardId)
    .then((data) => {
      console.log(data);
      // удаляем карточку со страницы
      // после удачного ответа сервера
      this._element.querySelector('.card__trash').closest('.card').remove();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
    // закрываем форму
    super.close();
  }

  // публичный метод открытия попапа
  open(delElement, cardId) {
    super.open();
    this._element = delElement;
    this._cardId = cardId;
    // устанавливаем слушатель
    this._popupElement.addEventListener('submit', this._handleSubmitDelCard);
  }

  // публичный метод закрытия попапа
  close() {
    super.close();
    // снимаем слушатель
    this._popupElement.removeEventListener('submit', this._handleSubmitDelCard);
  }
}
