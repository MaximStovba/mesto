// Card.js
import { api } from '../pages/index.js';

export class Card {
	constructor({ cardSelector, handleCardClick, handleTrashBtnClick }) {

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBtnClick = handleTrashBtnClick;
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
	_setEventListeners(cardId) {
    // настройка переключения лайка
		this._element.querySelector('.card__like').addEventListener('click', () => {
			this._toggleLike(cardId);
    });
    // настройка удаления карточки
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashBtnClick(this._element, cardId);
    });
    // настройка открытия попапа с большым изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
      // добавим вызов функции _handleCardClick передадим ей нужное изображение
      this._handleCardClick(this._element.querySelector('.card__image'));
    });
	}

  // приватный метод переключения лайка
  _toggleLike(cardId) {
    const cardLike = this._element.querySelector('.card__like');
    // передаем данные по лайкам на сервер
    if (!cardLike.classList.contains('card__like_active')) {
      api.putLike(cardId)
        .then((data) => {
          // тогглим лайк
          cardLike.classList.add('card__like_active');
          // отражаем актуальное количество лайков
          this._element.querySelector('.card__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    } else {
      api.delLike(cardId)
        .then((data) => {
          // тогглим лайк
          cardLike.classList.remove('card__like_active');
          // отражаем актуальное количество лайков
          this._element.querySelector('.card__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }
  }

  // публичный метод наполнение карточки данными
  generateCard(item, userId) {
    const link = item.link;
    const name = item.name;
    const likes = item.likes;
    const numLikes = item.likes.length;
    const ownerId = item.owner._id;
    const cardId = item._id;

    this._getTemplate();
    this._setEventListeners(cardId);

    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.src = link;
    cardImageElement.alt = name;
    this._element.querySelector('.card__title').textContent = name;
    this._element.querySelector('.card__num-like').textContent = numLikes;

    // отображаем кнопку удаления карточки только на своих карточках
    if (ownerId != userId) {
      this._element.querySelector('.card__trash').classList.add('card__trash_hidden');
    }

    // отображаем свои лайки
    likes.forEach((like) => {
      if (like._id == userId) {
        this._element.querySelector('.card__like').classList.add('card__like_active');
      }
    });

    return this._element;
  }
}
