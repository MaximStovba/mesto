import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const content = document.querySelector('.content');
const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
export const popUpImg = content.querySelector('.popup_type_image'); // Находим pop-up открытия картинки

const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
const addButton = content.querySelector('.profile__add-button'); // Находим кнопку добавления карточки
const saveButton = content.querySelector('.popup__btn_action_save'); // Находим кнопку сохранения профиля

// const closeFormButton = content.querySelector('.popup__btn-close'); // Находим кнопку закрытия попапа
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

const cardsContainer = document.querySelector('.card-container'); // Элемент куда будем вставлять "карточки"
const cardListSection = '.card-container'; // Селектор, куда будем вставлять "карточки" v2

// Находим все поля внутри форм, делаем из них массив
const inputListEditForm = Array.from(formEditElement.querySelectorAll('.popup__text'));
const inputListAddForm = Array.from(formAddElement.querySelectorAll('.popup__text'));

const formConfig = { // настройки формы
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn_disabled',
};

// Для каждой проверяемой формы создаем экземпляр класса
// и вызываем метод enableValidation
const formEditValid = new FormValidator(formConfig, formEditElement);
  formEditValid.enableValidation();
const formAddValid = new FormValidator(formConfig, formAddElement);
  formAddValid.enableValidation();

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

// Функция подготовки к скрытию ошибок валидации при открытии формы
function checkInputBeforeFormOpening (inputList, formElement, formValid) {
  inputList.forEach((inputElement) => {
    formValid.hideInputError(formElement, inputElement, formConfig);
  });
}

// Функция отображения в форме информации из профиля
function showInfoOfProfile () {
  popupTextTypeName.value = profileTitle.textContent;
  popupTextTypeAbout.value = profileSubtitle.textContent;
}

// ---------   экземпляр класса PopupWithForm ------------
const popupEdit = new PopupWithForm({
  formSelector: '.popup_type_edit',
  closeButtonSelector: '.popup__btn-close_formtype_edit',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    profileTitle.textContent = formData.name; // => Сохраняем значение "Имя"
    profileSubtitle.textContent = formData.about; // => Сохраняем значение "О себе"
    profileAvatar.setAttribute('alt', formData.name); // => Изменяем "альт" аватара профиля
  }
});
popupEdit.setEventListeners();
// ---------   экземпляр класса PopupWithForm ------------

// ---------   экземпляр класса PopupWithForm ------------
const popupAdd = new PopupWithForm({
  formSelector: '.popup_type_add',
  closeButtonSelector: '.popup__btn-close_formtype_add',
  handleFormSubmit: (formData) => {
    // создаем, наполняем данными и публикуем новую карточку v3
  const newCard = new Section({
    data: [{ name: formData.place, link: formData.url }],
    renderer: (item) => {
      const card = new Card(item, '#card');
      const cardElement = card.generateCard();
      newCard.setItem(cardElement);
      },
    },
    cardListSection
  );
  // отрисовка карточек v3
  newCard.renderItems();
  }
});
popupAdd.setEventListeners();
// ---------   экземпляр класса PopupWithForm ------------

// ---------   экземпляр класса PopupWithImage ------------
export const popupImage = new PopupWithImage({
  formSelector: '.popup_type_image',
  closeButtonSelector: '.popup__btn-close_formtype_image'
  });
  popupImage.setEventListeners();
// ---------   экземпляр класса PopupWithImage ------------


// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened(popupElement) {
  // отображаем в форме информацию из профиля
  showInfoOfProfile();
  // проводим валидацию полей ввода формы "редактирования профиля"
  checkInputBeforeFormOpening(inputListEditForm, formEditElement, formEditValid);
  // делаем кнопку активной при открытии
  saveButton.classList.remove(formConfig.inactiveButtonClass);
  // тогглим попап v2
  popupEdit.openPopup();
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened(popupElement) {
  // сбрасываем все поля формы
  formAddElement.reset();
  // проводим валидацию полей ввода формы "создания карточки"
  checkInputBeforeFormOpening(inputListAddForm, formAddElement, formAddValid);
  // тогглим попап v2
  popupAdd.openPopup();
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', () => prepareEditFormToOpened(popUpEdit));

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', () => prepareAddFormToOpened(popUpAdd));

// Первоначальная загрузка карточек v3
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
    },
  },
  cardListSection
);

// отрисовка карточек v3
cardsList.renderItems();
