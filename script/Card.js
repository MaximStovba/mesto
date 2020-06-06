// ------ начало класса Card ------- //

import { popupBigImage, popupFigcaption, popUpImg, togglePopup } from './index.js'

export class Card {
	constructor(item, cardSelector) {
    this._link = item.link;
    this._name = item.name;
    this._cardSelector = cardSelector;
	}

  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector) // #card
      .content // Находим шаблон "карточки"
      .querySelector('.card')
      .cloneNode(true); // Клонируем содержимое тега template

    this._element = cardElement;
  }

  // установка слушателей
	_setEventListeners() {
    // настройка переключения лайка
		this._element.querySelector('.card__like').addEventListener('click', () => {
			this._toggleLike();
    });
    // настройка удаления карточки
    this._element.querySelector('.card__trash').addEventListener('click', () => {
			this._delCard();
    });
    // настройка открытия попапа с большым изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
			this._openPopupImg();
    });
	}

  // приватный метод переключения лайка
  _toggleLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  // приватный метод удаления карточки
  _delCard() {
    this._element.querySelector('.card__trash').closest('.card').remove();
  }

  // приватный метод открытия попапа с большым изображением
  _openPopupImg() {
    popupBigImage.src = this._element.querySelector('.card__image').src;
    popupBigImage.alt = this._element.querySelector('.card__image').alt;
    popupFigcaption.textContent = this._element.querySelector('.card__image').alt;
    togglePopup(popUpImg); // открываем попап с большым изображением!
  }

  // публичный метод наполнение карточки данными
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}

// ------ конец класса Card ------- //
