// PopupWithForm.js

import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
	constructor({ formSelector, handleFormSubmit, submitButton}) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit; // функция-колбэк
    this._submitButton = submitButton; // кнопка сабмита
    this._submitButtonText = this._submitButton.textContent; // сохраняем начальное значение кнопки
    this._handleSubmitPopupWithForm = this._handleSubmitPopupWithForm.bind(this);
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

  // приватный метод обработки сабмита формы
  _handleSubmitPopupWithForm(evt) {
    // отменяем стандартную отправку формы
    evt.preventDefault();
    // добавим вызов функции _handleFormSubmit
    // передадим ей объект — результат работы _getInputValues
    this._handleFormSubmit(
      this._getInputValues()
    );
  }

  // публичный метод добавления надписи "Сохранение..." кнопки сабмита
  setBtnStartLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }
  // публичный метод возврата стандартной надписи кнопки сабмита
  setBtnEndLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }

  // публичный метод открытия попапа
  open() {
    super.open();
    // устанавливаем бработчик сабмита формы
    this._popupElement.addEventListener('submit', this._handleSubmitPopupWithForm);
  }

  // публичный метод закрытия попапа
  close() {
    super.close();
    this._popupElement.querySelector('.popup__container').reset();
    // снимаем бработчик сабмита формы
    this._popupElement.removeEventListener('submit', this._handleSubmitPopupWithForm);
  }
}

