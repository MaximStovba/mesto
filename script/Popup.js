export class Popup {
  constructor({ formSelector, closeButtonSelector }) {
    this._popupElement = document.querySelector(formSelector);
    this._popupCloseButton = document.querySelector(closeButtonSelector);
  }

  // приватный метод закрытия попапа клавишей Esc / Overlay
  _handleEscClose(evt) {
    // console.log(this._popupElement.classList.contains('popup_opened'));
    if ((this._popupElement.classList.contains('popup_opened')) && ((evt.target.classList.contains('popup')) || (evt.key === 'Escape'))) {
      this._togglePopup();
    }
  }

  // приватный метод открытия и закрытия pop-up
  _togglePopup () {
    // тогглим попап
    this._popupElement.classList.toggle('popup_opened');
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => this._togglePopup());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => this._handleEscClose(evt));
  }

  // публичный метод открытия попапа
  openPopup () {
    this._togglePopup();
  }

  // публичный метод закрытия попапа
  closePopup() {
    this._togglePopup();
  }
}
