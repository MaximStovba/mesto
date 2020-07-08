// PopupWithImage.js
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
	constructor({ formSelector, popupBigImage, popupFigcaption }) {
    super({ formSelector });
    this._popupBigImage = popupBigImage;
    this._popupFigcaption = popupFigcaption;
  }

  // публичный метод открытия попапа
  open(cardImageElement) {
    // вставляем в попап картинку и атрибут src изображения
    this._popupBigImage.src = cardImageElement.src;
    this._popupBigImage.alt = cardImageElement.alt;
    this._popupFigcaption.textContent = cardImageElement.alt;
    super.open();
  }
}
