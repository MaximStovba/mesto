import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const content = document.querySelector('.content');
const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
export const popUpImg = content.querySelector('.popup_type_image'); // Находим pop-up открытия картинки

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

const popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имя"
const popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"
const popupTextTypePlace = content.querySelector('.popup__text_type_place'); // Находим поле ввода "Название места"
const popupTextTypeUrl = content.querySelector('.popup__text_type_url'); // Находим поле ввода "Ссылка на картинку"
export const popupBigImage = content.querySelector('.popup__big-image'); // Находим большое изображение
export const popupFigcaption = content.querySelector('.popup__figcaption'); // Находим подпись большого изображения

const cardTemplate = document.querySelector('#card').content; // Находим шаблон "карточки"
const cardsContainer = document.querySelector('.card-container'); // Элемент куда будем вставлять "карточки"

// Находим все поля внутри форм, делаем из них массив
const inputListEditForm = Array.from(formEditElement.querySelectorAll('.popup__text'));
const inputListAddForm = Array.from(formAddElement.querySelectorAll('.popup__text'));

const setObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn_disabled',
};

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

// Функция скрытия ошибок валидации при открытии формы
const hideImputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  // Очистим ошибку
  errorElement.textContent = '|';
};

// Функция подготовки к скрытию ошибок валидации при открытии формы
function checkImputBeforFormOpening (inputList, formElement) {
  inputList.forEach((inputElement) => {
    hideImputError(formElement, inputElement, setObj);
  });
}

// Функция отображения в форме информации из профиля
function showInfoOfProfile () {
  popupTextTypeName.value = profileTitle.textContent;
  popupTextTypeAbout.value = profileSubtitle.textContent;
}

// Функция определения открытой формы
function whatFormToClose (evt) {
  const openedFormElement = content.querySelector('.popup_opened'); // Находим открытую форму
  eventToClosePopup(evt, openedFormElement);
}

// Функция устанавки / снятия слушатели Esc и Overlay
function toggleEventListeners (popupElement) {
  if (!popupElement.classList.contains('popup_opened')) {
    // Устанавливаем слушатель закрытия формы кликом на оверлей
    document.addEventListener('click', whatFormToClose);
    // Устанавливаем слушатель клавиатуры
    document.addEventListener('keydown', whatFormToClose);
  } else {
    // Снятие слушателя закрытия формы кликом на оверлей
    document.removeEventListener('click', whatFormToClose);
    // Снятие слушателя клавиатуры
    document.removeEventListener('keydown', whatFormToClose);
  }
}

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

// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened(popupElement) {
  // отображаем в форме информацию из профиля
  showInfoOfProfile();
  // проводим валидацию полей ввода формы "редактирования профиля"
  checkImputBeforFormOpening(inputListEditForm, formEditElement);
  toggleButtonState(inputListEditForm, saveButton, setObj);
  // тогглим попап
  togglePopup(popupElement);
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened(popupElement) {
  // сбрасываем все поля формы
  formAddElement.reset();
  // проводим валидацию полей ввода формы "создания карточки"
  checkImputBeforFormOpening(inputListAddForm, formAddElement);
  toggleButtonState(inputListAddForm, createButton, setObj);
  // тогглим попап
  togglePopup(popupElement);
}

// Функция открытия и закрытия pop-up
export function togglePopup(popupElement) {
  // тогглим слушатели Esc и Overlay
  toggleEventListeners(popupElement);
  // тогглим попап
  popupElement.classList.toggle('popup_opened');
}

// Функция закрытия формы по событию (Esc и Overlay)
function eventToClosePopup (evt, formElement) { // eventToClosePopup
  if ((evt.target.classList.contains('popup')) || (evt.key === 'Escape')) {
    togglePopup(formElement); // закрываем попап по событию!
  }
}

function formEditSubmitHandler (evt) { // Обработчик «отправки» формы редактирования профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение "Имя"
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение "О себе"
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  togglePopup(popUpEdit); // Закрываем форму редактирования профиля!
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // создаем, наполняем данными и публикуем новую карточку v2
  const userCard = new Card({ name: popupTextTypePlace.value, link: popupTextTypeUrl.value }, '#card');
	const userCardElement = userCard.generateCard();
	cardsContainer.prepend(userCardElement);
  // закрываем форму добавления карточки!
  togglePopup(popUpAdd);
  // сбрасываем все поля
  formAddElement.reset();
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', () => prepareEditFormToOpened(popUpEdit));

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', () => prepareAddFormToOpened(popUpAdd));

// слушатель закрытия формы редактирования профиля
closeEditFormButton.addEventListener('click', () => togglePopup(popUpEdit));

// слушатель закрытия формы добавления карточки
closeAddFormButton.addEventListener('click', () => togglePopup(popUpAdd));

// слушатель закрытия формы с большим изображением
closeImgFormButton.addEventListener('click', () => togglePopup(popUpImg));

// Прикрепляем обработчики к форме редактирования профиля
formEditElement.addEventListener('submit', formEditSubmitHandler);

// Прикрепляем обработчики к форме добавления карточки
formAddElement.addEventListener('submit', formAddSubmitHandler);

// Первоначальная загрузка карточек
initialCards.forEach((item) => {
  const card = new Card(item, '#card');
	const cardElement = card.generateCard();
	cardsContainer.prepend(cardElement);
});

// Для каждой проверяемой формы создаем экземпляр класса
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(setObj.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы создаем экземпляр класса,
    // вызываем метод enableValidation
    const formValid = new FormValidator(setObj, formElement);
    formValid.enableValidation();
  });
