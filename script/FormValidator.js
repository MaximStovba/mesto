// -------- начало класса FormValidator ------------ //

export class FormValidator {
  constructor(setObj, formElement) {
    this._obj = setObj;
    this._formElement = formElement;
  }

  // приватный метод отображения ошибок валидации
  _showImputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  }

  // приватный метод скрытия ошибок валидации
  _hideImputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    // Очистим ошибку
    errorElement.textContent = '|';
  }

  // приватный метод проверяет formInput на корректность введённых данных и вызывает hideError/showError
  _checkInputValidity(formElement, inputElement, obj) {
    if (!inputElement.validity.valid) {
      this._showImputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      this._hideImputError(formElement ,inputElement, obj);
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
  _toggleButtonState(inputList, buttonElement, obj) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
    // иначе делаем кнопку активной
    buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  }

  // установка слушателей
  _setEventListeners(formElement, obj) {
    // Находим все поля внутри формы, делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.buttonSelector);
    // Проверяем состояние кнопки при первой загрузке страницы
    this._toggleButtonState(inputList, buttonElement, obj);
    // toggleButtonState(inputList, formElement);
    // Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._checkInputValidity(formElement, inputElement, obj);
      // Проверка состояния кнопки при каждом изменении символа в любом из полей
      this._toggleButtonState(inputList, buttonElement, obj);
      });
    });
  }

  // публичный метод включения валидации формы
  enableValidation() {
    // Для формы вызовем функцию setEventListeners
    this._setEventListeners(this._formElement, this._obj);
  }
}

// -------- конец класса FormValidator ------------ //
