// Card.js
import { popupImgDelete, api } from '../pages/index.js';

export class Card {
	constructor({ item, cardSelector, handleCardClick }) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._numLikes = item.likes.length;
    this._ownerId = item.owner._id;
    this._cardId = item._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      popupImgDelete.open(this._element, this._cardId);
    });
    // настройка открытия попапа с большым изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
      // добавим вызов функции _handleCardClick передадим ей нужное изображение
      this._handleCardClick(this._element.querySelector('.card__image'));
    });
	}

  // приватный метод переключения лайка
  _toggleLike() {
    const cardLike = this._element.querySelector('.card__like');
    // тогглим лайк
    cardLike.classList.toggle('card__like_active');
    // передаем данные по лайкам на сервер
    if (cardLike.classList.contains('card__like_active')) {
      api.putLike(this._cardId)
        .then((data) => {
          // console.log(data.likes.length);
          this._element.querySelector('.card__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    } else {
      api.delLike(this._cardId)
        .then((data) => {
          // console.log(data.likes.length);
          this._element.querySelector('.card__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }
  }

  // публичный метод наполнение карточки данными
  generateCard(userId) {
    this._getTemplate();
    this._setEventListeners();

    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__num-like').textContent = this._numLikes;

    // отображаем кнопку удаления карточки только на своих карточках
    if (this._ownerId != userId) {
      this._element.querySelector('.card__trash').classList.add('card__trash_hidden');
    }

    // отображаем свои лайки
    this._likes.forEach((like) => {
      if (like._id == userId) {
        this._element.querySelector('.card__like').classList.add('card__like_active');
      }
    });

    return this._element;
  }
}
