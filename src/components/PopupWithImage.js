// PopupWithImage.js

import { Popup } from './Popup.js';
import { popupBigImage, popupFigcaption } from '../utils/constants.js';

export class PopupWithImage extends Popup {
	constructor({ formSelector }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
  }

  // публичный метод открытия попапа
  open(cardImageElement) {
    // вставляем в попап картинку и атрибут src изображения
    popupBigImage.src = cardImageElement.src;
    popupBigImage.alt = cardImageElement.alt;
    popupFigcaption.textContent = cardImageElement.alt;
    // открываем попап
    super.open();
  }
}
