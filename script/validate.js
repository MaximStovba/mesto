// Функция управления состоянием кнопки сабмита
function setSubmitButtonState(isFormValid, formElement) {
  // условие для кнопки редактирования профиля
  if (isFormValid && formElement.classList.contains(setObj['formEditClass'])) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove(setObj['inactiveButtonClass']);
  } else if (!isFormValid && formElement.classList.contains(setObj['formEditClass'])) {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add(setObj['inactiveButtonClass']);
  }
  // условие для кнопки добавления карточки
  if (isFormValid && formElement.classList.contains(setObj['formAddClass'])) {
    createButton.removeAttribute('disabled');
    createButton.classList.remove(setObj['inactiveButtonClass']);
  } else if (!isFormValid && formElement.classList.contains(setObj['formAddClass'])) {
    createButton.setAttribute('disabled', true);
    createButton.classList.add(setObj['inactiveButtonClass']);
  }
}

// Функция отображения ошибок валидации
const showImputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(setObj['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setObj['errorClass']);
};

// Функция скрытия ошибок валидации
const hideImputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(setObj['inputErrorClass']);
  errorElement.classList.remove(setObj['errorClass']);
  // Очистим ошибку
  errorElement.textContent = '|';
};

// Функция проверяет formInput на корректность введённых данных и вызывает hideError/showError
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideImputError(formElement ,inputElement);
  }
};

// Функция обходит массив полей для проверки их валидности
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент формы, содержащий кнопку, состояние которой нужно поменять
const toggleButtonState = (inputList, formElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    setSubmitButtonState(false, formElement);
  } else {
    // иначе делаем кнопку активной
    setSubmitButtonState(true, formElement);
  }
};

// Функция добавления слушателей событий всем полям ввода формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(setObj['inputSelector']));
  // Проверяем состояние кнопки при первой загрузке страницы
  toggleButtonState(inputList, formElement);
  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      // Проверка состояния кнопки при каждом изменении символа в любом из полей
      toggleButtonState(inputList, formElement);
    });
  });
};

// Функция запуска процесса валидации полей ввода всех форм
const enableValidation = (obj) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(setObj);
