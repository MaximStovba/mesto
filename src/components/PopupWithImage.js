// PopupWithImage.js
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
	constructor({ formSelector, popupBigImage, popupFigcaption }) {
    super(formSelector);
    this._popupBigImage = popupBigImage;
    this._popupFigcaption = popupFigcaption;
    this._popupElement = document.querySelector(formSelector);
  }

  // публичный метод открытия попапа
  open(cardImageElement) {
    super.open();
    // вставляем в попап картинку и атрибут src изображения
    this._popupBigImage.src = cardImageElement.src;
    this._popupBigImage.alt = cardImageElement.alt;
    this._popupFigcaption.textContent = cardImageElement.alt;
  }
}
