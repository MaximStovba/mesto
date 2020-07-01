import { PopupPatchAvatar } from '../components/PopupPatchAvatar.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';

import {
  editButton,
  addButton,
  saveButton,
  createButton,
  deleteButton,
  avatarButton,
  patchButton,
  formEditElement,
  formAddElement,
  formAvatarElement,
  popupTextTypeName,
  popupTextTypeAbout,
  cardListSection,
  inputListEditForm,
  inputListAddForm,
  inputListAvatarForm,
  formConfig,
  initialCards
} from '../utils/constants.js';
import { Popup } from '../components/Popup.js';

// ------------ тест Api ----------- //
export const api = new Api();
// загружаем данные пользователя с сервера
api.getUserInfo();
// загружаем карточки с сервера
api.getInitialCards();

// ------------ тест Api ----------- //

// Для каждой проверяемой формы создаем экземпляр класса
// и вызываем метод enableValidation
const formEditValid = new FormValidator(formConfig, formEditElement);
  formEditValid.enableValidation();
const formAddValid = new FormValidator(formConfig, formAddElement);
  formAddValid.enableValidation();
const formAvatarValid = new FormValidator(formConfig, formAvatarElement);
  formAvatarValid.enableValidation();

// Функция подготовки к скрытию ошибок валидации при открытии формы
function checkInputBeforeFormOpening (inputList, formElement, formValid) {
  inputList.forEach((inputElement) => {
    formValid.hideInputError(formElement, inputElement, formConfig);
  });
}


// Функция отображения состояния загрузки данных
export function renderLoading(isLoading, typeOfForm, btnElement) {
  const mainBtnName = {
    editProfile: 'Сохранить',
    addCard: 'Создать',
    patchAvatar: 'Сохранить',
  }
  if (isLoading) {
    // добавляем надпись "Сохранение..."
    btnElement.textContent = 'Сохранение...';
  } else {
    // устанавливаем стандартное название кнопки
    btnElement.textContent = mainBtnName[typeOfForm];
  }
}


// ------ Экземпляр класса Section для загрузки карточек v4 -------- //
export const cardsList = new Section({
  data: null,
  renderer: (item) => {
    const card = new Card({
      item: item,
      cardSelector: '#card',
      handleCardClick: (cardData) => {
        // объект, который мы передадим при вызове handleCardClick
        // окажется на месте параметра cardData
        popupImage.open(cardData);
      }
    });
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
    },
  },
  cardListSection
);
// ------ Экземпляр класса Section для загрузки карточек v4 -------- //

// создаем экземпляр класса UserInfo ---------
const newUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  aboutInfoSelector: '.profile__subtitle'
});
// создаем экземпляр класса UserInfo ---------

// ---------   экземпляр класса PopupWithForm ------------
const popupEdit = new PopupWithForm({
  formSelector: '.popup_type_edit',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    // добавление данных профиля на страницу
    newUserInfo.setUserInfo(formData);
    // сохранение данных профиля на сервере
    api.patchUserInfo(formData, saveButton);
    // меняем название кнопки сабмита при загрузке данных на сервис
    renderLoading(true, 'editProfile', saveButton);
  }
});
popupEdit.setEventListeners();
// ---------   экземпляр класса PopupWithForm ------------

// ---------   экземпляр класса PopupWithForm ------------
const popupAdd = new PopupWithForm({
  formSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
  // загрузка новой карточки
  api.postNewCard(formData, createButton);
  // меняем название кнопки сабмита при загрузке данных на сервис
  renderLoading(true, 'addCard', createButton);
  }
});
popupAdd.setEventListeners();
// ---------   экземпляр класса PopupWithForm ------------

// ---------   экземпляр класса PopupWithImage ------------
export const popupImage = new PopupWithImage({
  formSelector: '.popup_type_image',
  });
  popupImage.setEventListeners();
// ---------   экземпляр класса PopupWithImage ------------

// ---------   экземпляр класса PopupDeleteCard (удаление картоки) ------------
export const popupImgDelete = new PopupDeleteCard({
  formSelector: '.popup_type_del',
  });
  popupImgDelete.setEventListeners();
// ---------   экземпляр класса PopupDeleteCard (удаление картоки) ------------

// ---------   экземпляр класса PopupPatchAvatar ------------
const popupPatchAvatar = new PopupPatchAvatar({
  formSelector: '.popup_type_avatar',
  });
  popupPatchAvatar.setEventListeners();
// ---------   экземпляр класса PopupPatchAvatar ------------

// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened() {
  // отображаем в форме информацию из профиля
  const formValues = newUserInfo.getUserInfo();
  popupTextTypeName.value = formValues.name;
  popupTextTypeAbout.value = formValues.about;
  // проводим валидацию полей ввода формы "редактирования профиля"
  checkInputBeforeFormOpening(inputListEditForm, formEditElement, formEditValid);
  // делаем кнопку активной при открытии
  saveButton.classList.remove(formConfig.inactiveButtonClass);
  // тогглим попап v2
  popupEdit.open();
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened() {
  // сбрасываем все поля формы
  formAddElement.reset();
  // проводим валидацию полей ввода формы "создания карточки"
  checkInputBeforeFormOpening(inputListAddForm, formAddElement, formAddValid);
  // делаем кнопку неактивной при открытии
  createButton.classList.add(formConfig.inactiveButtonClass);
  createButton.disabled = true;
  // тогглим попап v2
  popupAdd.open();
  // убираем подчеркивание полей ввода красным при открытии
  inputListAddForm.forEach((inputElement) => {
    inputElement.classList.remove(formConfig.inputErrorClass);
  });
}

// Функция подготовки формы смены аватара к открытию
function preparePatchFormToOpened() {
  // сбрасываем все поля формы
  formAvatarElement.reset();
  // проводим валидацию полей ввода формы
  checkInputBeforeFormOpening(inputListAvatarForm, formAvatarElement, formAvatarValid);
  // делаем кнопку неактивной при открытии
  patchButton.classList.add(formConfig.inactiveButtonClass);
  patchButton.disabled = true;
  // тогглим попап
  popupPatchAvatar.open();
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', prepareEditFormToOpened);

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', prepareAddFormToOpened);

// слушатель открытия формы смены аватара
avatarButton.addEventListener('click', preparePatchFormToOpened);
