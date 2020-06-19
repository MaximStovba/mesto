import { Popup } from './Popup.js';
import { popupBigImage, popupFigcaption } from '../utils/constants.js';

export class PopupWithImage extends Popup {
	constructor({ formSelector }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._popupCloseButton = this._popupElement
      .querySelector('.popup__img-container')
      .querySelector('.popup__btn-close');
  }

  setEventListeners() {
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super.close());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
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
