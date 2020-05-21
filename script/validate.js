// Функция отображения ошибок валидации
const showImputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

// Функция скрытия ошибок валидации
const hideImputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  // Очистим ошибку
  errorElement.textContent = '|';
};

// Функция проверяет formInput на корректность введённых данных и вызывает hideError/showError
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideImputError(formElement ,inputElement, obj);
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
const toggleButtonState = (inputList, buttonElement, obj) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    // иначе делаем кнопку активной
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
};

// Функция добавления слушателей событий всем полям ввода формы
const setEventListeners = (formElement, obj) => {
  // Находим все поля внутри формы, делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.buttonSelector);
  // Проверяем состояние кнопки при первой загрузке страницы
  toggleButtonState(inputList, buttonElement, obj);
  // toggleButtonState(inputList, formElement);
  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, obj);
      // Проверка состояния кнопки при каждом изменении символа в любом из полей
      toggleButtonState(inputList, buttonElement, obj);
      //toggleButtonState(inputList, formElement);
    });
  });
};

// Функция запуска процесса валидации полей ввода всех форм
const enableValidation = (obj) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
};

// Вызовем функцию
enableValidation(setObj);
