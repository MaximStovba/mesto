// Card.js
export class Card {
	constructor({ cardSelector, handleCardClick, handleTrashBtnClick, handleLikeClick }) {

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBtnClick = handleTrashBtnClick;
    this._handleLikeClick = handleLikeClick;
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
      this._handleLikeClick(this);
    });
    // настройка удаления карточки
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashBtnClick(this);
    });
    // настройка открытия попапа с большым изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
      // добавим вызов функции _handleCardClick передадим ей нужное изображение
      this._handleCardClick(this._element.querySelector('.card__image'));
    });
	}

  // публичный метод наполнение карточки данными
  generateCard(item, userId) {
    const link = item.link;
    const name = item.name;
    const likes = item.likes;
    const numLikes = item.likes.length;
    const ownerId = item.owner._id;
    this._cardId = item._id;
    this._numLikes = item.likes.length;

    this._getTemplate();
    this._setEventListeners();

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

  // публичный метод isLiked
  isLiked() {
    if (this._element.querySelector('.card__like').classList.contains('card__like_active')) {
      return true;
    } else {
      return false;
    }
  }

  // публичный метод getId
  getId() {
    return this._cardId;
  }

  // публичный метод cardDelete
  delete() {
    this._element.querySelector('.card__trash').closest('.card').remove();
  }

  // публичный метод updateLikes
  updateLikes(count) {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
    this._element.querySelector('.card__num-like').textContent = count;
  }

}
