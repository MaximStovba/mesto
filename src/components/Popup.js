// Popup.js

export class Popup {
  constructor({ formSelector }) {
    this._popupElement = document.querySelector(formSelector);
  }

  // приватный метод закрытия попапа клавишей Esc / Overlay
  _handleEscClose(evt) {
    if ((this._popupElement.classList.contains('popup_opened')) && ((evt.target.classList.contains('popup')) || (evt.key === 'Escape'))) {
      this._popupElement.classList.remove('popup_opened');
    }
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    this._popupCloseButton = this._popupElement
      .querySelector('.popup__form')
      .querySelector('.popup__btn-close');

    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => this.close());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => this._handleEscClose(evt));
  }

  // публичный метод открытия попапа
  open() {
    this._popupElement.classList.add('popup_opened');
  }

  // публичный метод закрытия попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
  }
}
