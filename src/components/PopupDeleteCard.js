// PopupDeleteCard.js
import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
	constructor({ formSelector, handleFormSubmit }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit; // функция-колбэк
    this._handleSubmitDelCard = this._handleSubmitDelCard.bind(this);
  }

  // приватный метод обработки сабмита формы
  _handleSubmitDelCard(evt) {
    // отменяем стандартную отправку формы
    evt.preventDefault();
    // удаляем карточку с сервера
    this._handleFormSubmit(this._cardId, this._element);
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
