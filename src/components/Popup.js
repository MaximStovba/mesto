// Popup.js
export class Popup {
  constructor({ formSelector }) {
    this._popupElement = document.querySelector(formSelector);
    this._popupCloseButton = this._popupElement
      .querySelector('.popup__form')
      .querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
  }
  // приватный метод закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      // console.log(this._popupElement);
    }
  }
  // приватный метод закрытия попапа кликом по Overlay
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
      // console.log(this._popupElement);
    }
  }
  // приватный метод закрытия попапа BtnClose
  _handleBtnClose() {
    this.close();
  }

  // публичный метод открытия попапа
  open() {
    this._popupElement.classList.add('popup_opened');

    // устанавливаем слушатель ~Esc
    document.addEventListener('keydown', this._handleEscClose);
    // устанавливаем слушатель ~Overlay
    document.addEventListener('click', this._handleOverlayClose);
    // устанавливаем слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', this._handleBtnClose);
  }

  // публичный метод закрытия попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
    
    // снимаем слушатель ~Esc
    document.removeEventListener('keydown', this._handleEscClose);
    // снимаем слушатель ~Overlay
    document.removeEventListener('click', this._handleOverlayClose);
    // снимаем слушатель клика кнопки закрытия попапа
    this._popupCloseButton.removeEventListener('click', this._handleBtnClose);
  }
}
