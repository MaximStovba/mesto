const content = document.querySelector('.content');
const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
const popUpImg = content.querySelector('.popup_type_image'); // Находим pop-up открытия картинки

const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
const addButton = content.querySelector('.profile__add-button'); // Находим кнопку добавления карточки
const saveButton = content.querySelector('.popup__btn_action_save'); // Находим кнопку сохранения профиля
const createButton = content.querySelector('.popup__btn_action_create'); // Находим кнопку создания карточки
const closeEditFormButton = content.querySelector('.popup__btn-close_formtype_edit'); // Находим кнопку закрытия попапа редактирования профиля
const closeAddFormButton = content.querySelector('.popup__btn-close_formtype_add'); // Находим кнопку закрытия попапа добавления карточки
const closeImgFormButton = content.querySelector('.popup__btn-close_formtype_image'); // Находим кнопку закрытия попапа открытия картинки

const formEditElement = content.querySelector('.popup__container_formtype_edit'); // Находим форму редактирования профиля
const formAddElement = content.querySelector('.popup__container_formtype_add'); // Находим форму добавления карточки

const profileTitle = content.querySelector('.profile__title'); // Находим заголовок "Имени"
const profileSubtitle = content.querySelector('.profile__subtitle'); // Находим заголовок "О себе"
const profileAvatar = content.querySelector('.profile__avatar'); // Находим аватар профиля

//const formInput = content.querySelector('.popup__text'); // Находим поле ввода формы !!!
//const formError = content.querySelector(`#${formInput.id}-error`);

const popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имя"
const popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"
const popupTextTypePlace = content.querySelector('.popup__text_type_place'); // Находим поле ввода "Название места"
const popupTextTypeUrl = content.querySelector('.popup__text_type_url'); // Находим поле ввода "Ссылка на картинку"
const popupBigImage = content.querySelector('.popup__big-image'); // Находим большое изображение
const popupFigcaption = content.querySelector('.popup__figcaption'); // Находим подпись большого изображения

const cardTemplate = document.querySelector('#card').content; // Находим шаблон "карточки"
const cardsContainer = document.querySelector('.card-container'); // Элемент куда будем вставлять "карточки"
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function setSubmitButtonState(isFormValid, formElement) { // Функция управления состоянием кнопки сабмита
  // условие для кнопки редактирования профиля
  if (isFormValid && formElement.classList.contains('popup__container_formtype_edit')) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__btn_disabled');
  } else if (!isFormValid && formElement.classList.contains('popup__container_formtype_edit')) {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__btn_disabled');
  }
  // условие для кнопки добавления карточки
  if (isFormValid && formElement.classList.contains('popup__container_formtype_add')) {
    createButton.removeAttribute('disabled');
    createButton.classList.remove('popup__btn_disabled');
  } else if (!isFormValid && formElement.classList.contains('popup__container_formtype_add')) {
    createButton.setAttribute('disabled', true);
    createButton.classList.add('popup__btn_disabled');
  }
}

// функция-валидатор полей ввода формы
function isImputValid(firstImput, secondImput, formElement) {
  const isValid = firstImput.value.length > 0 && secondImput.value.length > 0;
  setSubmitButtonState(isValid, formElement);
}

// функция открытия и закрытия pop-up
function togglePopup(popupElement) {
  // проверяем, что это форма "редактирования профиля" и она скрыта
  if ((popupElement.classList.contains('popup_type_edit')) && (popupElement.classList.contains('popup_hidden'))) {
    // отображаем в форме информацию из профиля
    popupTextTypeName.value = profileTitle.textContent;
    popupTextTypeAbout.value = profileSubtitle.textContent;
    // проводим валидацию полей ввода формы
    isImputValid(popupTextTypeName, popupTextTypeAbout, formEditElement);
  }
  // проверяем, что это форма "создания карточки" и она скрыта
  if ((popupElement.classList.contains('popup_type_add')) && (popupElement.classList.contains('popup_hidden'))) {
    // проводим валидацию полей ввода формы
    isImputValid(popupTextTypePlace, popupTextTypeUrl, formAddElement);
    // сбрасываем все поля формы
    formAddElement.reset();
  }
  // тогглим попап
  popupElement.classList.toggle('popup_hidden');
}

// функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// функция удаления карточки
function delCard(evt) {
  const elementsElement = evt.target.closest('.card');
  // снимаем обработчики с карточки
  elementsElement.querySelector('.card__like').removeEventListener('click', toggleLike);
  elementsElement.querySelector('.card__trash').removeEventListener('click', delCard);
  elementsElement.querySelector('.card__image').removeEventListener('click', openPopupImg);
  // удаляем карточку
  elementsElement.remove();
}

// функция открытия попапа с большым изображением
function openPopupImg(evt) {
  popupBigImage.src = evt.target.src;
  popupBigImage.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  togglePopup(popUpImg); // открываем попап с большым изображением
}

// функция создания новой карточки
function createCard(item) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  // наполняем содержимым
  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  // настройка переключения лайка
  cardElement.querySelector('.card__like').addEventListener('click', toggleLike);
  // настройка удаления карточки
  cardElement.querySelector('.card__trash').addEventListener('click', delCard);
  // настройка открытия попапа с большым изображением
  cardElementImage.addEventListener('click', openPopupImg);
  // отображаем карточку на странице в начале блока
  return cardElement;
}

// Формируем массив карт
function loadCards(cards) {
  return cards.map((card) => createCard(card));
}

// Принимаем массив для отрисовки
function publicCards(cards) {
  cardsContainer.prepend(...cards);
}

// функция добавления класса "popup__text_type_error"
const showImputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
};

// функция удаления класса "popup__text_type_error"
const hideImputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error_active');
  // Очистим ошибку
  errorElement.textContent = '|';
};

// функция проверяет formInput на корректность введённых данных и вызывает hideError и showError
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideImputError(formElement ,inputElement);
  }
};

function formEditSubmitHandler (evt) { // Обработчик «отправки» формы редактирования профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение "Имя"
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение "О себе"
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  togglePopup(popUpEdit); // Закрываем форму редактирования профиля
  setSubmitButtonState(false, formEditElement);
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // создаем и наполняем новую карточку данными
  const userCard = createCard({ name: popupTextTypePlace.value, link: popupTextTypeUrl.value });
  // Добавляем новую карточку в разметку
  publicCards([userCard]);
  togglePopup(popUpAdd); // Закрываем форму добавления карточки
  setSubmitButtonState(false, formAddElement);
  // сбрасываем все поля
  formAddElement.reset();
}

// слушатель открытия формы редактирования профиля
// открываем попап редактирования профиля
editButton.addEventListener('click', (evt) => togglePopup(popUpEdit));

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', (evt) => togglePopup(popUpAdd));

// слушатель закрытия формы редактирования профиля
closeEditFormButton.addEventListener('click', (evt) => togglePopup(popUpEdit));

// слушатель закрытия формы добавления карточки
closeAddFormButton.addEventListener('click', (evt) => togglePopup(popUpAdd));

// слушатель закрытия формы с большим изображением
closeImgFormButton.addEventListener('click', (evt) => togglePopup(popUpImg));

// Прикрепляем обработчики к форме редактирования профиля
formEditElement.addEventListener('submit', formEditSubmitHandler);
// Проверка длины значений обоих полей
// formEditElement.addEventListener('input', function (evt) {
// isImputValid(popupTextTypeName, popupTextTypeAbout, formEditElement);
// });

// Прикрепляем обработчики к форме добавления карточки
formAddElement.addEventListener('submit', formAddSubmitHandler);
// Проверка длины значений обоих полей
// formAddElement.addEventListener('input', function (evt) {
// isImputValid(popupTextTypePlace, popupTextTypeUrl, formAddElement);
// });

// Слушатель события редактирования поля ввода формы
// formInput.addEventListener('input', function (evt) {
// console.log(evt.target.validity.valid);
// checkInputValidity(formEditElement, formInput);
// });


// Функция обходит массив полей и отвечает на вопрос:
// «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
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
// и элемент формы, содержащий кнопку, состояние которой нужно менять
const toggleButtonState = (inputList, formElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    console.log('InvalidInput');
    setSubmitButtonState(false, formElement);
  } else {
    // иначе делаем кнопку активной
    console.log('Ok');
    setSubmitButtonState(true, formElement);
  }
};

// Функция добавления слушателей событий всем полям ввода формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  // const buttonElement = formElement.querySelector('.popup__btn');
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

// Функция запуска процесса валидации полей ввода всех форм с классом "popup__container"
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // formElement.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
    // evt.preventDefault();
    // });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();



// Первоначальная загрузка карточек
publicCards(loadCards(initialCards));
