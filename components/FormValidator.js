// -------- начало класса FormValidator ------------ //

export class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
  }

  // приватный метод отображения ошибок валидации
  _showInputError(formElement, inputElement, errorMessage, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  }

  // публичный метод скрытия ошибок валидации
  hideInputError(formElement, inputElement, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    // Очистим ошибку
    errorElement.textContent = '|';
  }

  // приватный метод проверяет formInput на корректность введённых данных и вызывает hideError/showError
  _checkInputValidity(formElement, inputElement, formConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
      this.hideInputError(formElement ,inputElement, formConfig);
    }
  }

  // приватный метод обходит массив полей для проверки их валидности
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  // приватный метод принимает массив полей ввода
  // и элемент формы, содержащий кнопку, состояние которой нужно поменять
  _toggleButtonState(inputList, buttonElement, formConfig) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    buttonElement.classList.add(formConfig.inactiveButtonClass);
    } else {
    // иначе делаем кнопку активной
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
    }
  }

  // установка слушателей
  _setEventListeners(formElement, formConfig) {
    // Находим все поля внутри формы, делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.buttonSelector);
    // Проверяем состояние кнопки при первой загрузке страницы
    this._toggleButtonState(inputList, buttonElement, formConfig);
    // toggleButtonState(inputList, formElement);
    // Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._checkInputValidity(formElement, inputElement, formConfig);
      // Проверка состояния кнопки при каждом изменении символа в любом из полей
      this._toggleButtonState(inputList, buttonElement, formConfig);
      });
    });
  }

  // публичный метод включения валидации формы
  enableValidation() {
    // Для формы вызовем функцию setEventListeners
    this._setEventListeners(this._formElement, this._formConfig);
  }
}

// -------- конец класса FormValidator ------------ //
