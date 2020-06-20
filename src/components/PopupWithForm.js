// PopupWithForm.js

import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
	constructor({ formSelector, handleFormSubmit }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit; // функция-колбэк
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupElement.querySelectorAll('.popup__text');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объет значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    this._popupCloseButton = this._popupElement
      .querySelector('.popup__form')
      .querySelector('.popup__btn-close');

    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super.close());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
    // обработчик сабмита формы
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      // закрываем форму
      super.close();
    });
  }

  // публичный метод закрытия попапа
  close() {
    super.close();
    this._popupElement.reset();
  }
}

