import { Popup } from './Popup.js';
import { popupBigImage, popupFigcaption } from './index.js'


export class PopupWithImage extends Popup {
	constructor({ formSelector, closeButtonSelector }) {
    super(formSelector, closeButtonSelector);
    this._popupElement = document.querySelector(formSelector);
    this._popupCloseButton = document.querySelector(closeButtonSelector);
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super._togglePopup());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
  }

  // публичный метод открытия попапа
  openPopup (cardImageElement) {
    // вставляем в попап картинку и атрибут src изображения
    // console.log(cardImageElement);
    popupBigImage.src = cardImageElement.src;
    popupBigImage.alt = cardImageElement.alt;
    popupFigcaption.textContent = cardImageElement.alt;
    // тоглим попап
    super._togglePopup();
  }
}
