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
    super.setEventListeners();
    // обработчик сабмита формы
    this._popupElement.addEventListener('submit', (evt) => {
      // отменяем стандартную отправку формы
      evt.preventDefault();
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
    this._popupElement.querySelector('.popup__container').reset();
  }
}

