export class Popup {
  constructor({ formSelector }) {
    this._popupElement = document.querySelector(formSelector);
  }

  // приватный метод закрытия попапа клавишей Esc / Overlay
  _handleEscClose(evt) {
    // console.log(this._popupElement.classList.contains('popup_opened'));
    if ((this._popupElement.classList.contains('popup_opened')) && ((evt.target.classList.contains('popup')) || (evt.key === 'Escape'))) {
      //this.close();
      this._popupElement.classList.remove('popup_opened');
    }
  }

  // публичный метод добавления слушателей
  setEventListeners() {
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
