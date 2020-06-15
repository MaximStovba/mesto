import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
	constructor({ formSelector, closeButtonSelector, handleFormSubmit }) {
    super(formSelector, closeButtonSelector);
    this._popupElement = document.querySelector(formSelector);
    this._popupCloseButton = document.querySelector(closeButtonSelector);
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
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super._togglePopup());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
    // обработчик сабмита формы
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
      // console.log(evt.target);
      // console.log(this._getInputValues());

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());

      // тоглим форму
      super._togglePopup();
    });
  }

  // публичный метод закрытия попапа
  closePopup() {
    super._togglePopup();
    this._popupElement.reset();
  }
}

