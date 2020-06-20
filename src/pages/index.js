import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

import {
  editButton,
  addButton,
  saveButton,
  createButton,
  formEditElement,
  formAddElement,
  popupTextTypeName,
  popupTextTypeAbout,
  cardListSection,
  inputListEditForm,
  inputListAddForm,
  formConfig,
  initialCards
} from '../utils/constants.js';

// Для каждой проверяемой формы создаем экземпляр класса
// и вызываем метод enableValidation
const formEditValid = new FormValidator(formConfig, formEditElement);
  formEditValid.enableValidation();
const formAddValid = new FormValidator(formConfig, formAddElement);
  formAddValid.enableValidation();


// Функция подготовки к скрытию ошибок валидации при открытии формы
function checkInputBeforeFormOpening (inputList, formElement, formValid) {
  inputList.forEach((inputElement) => {
    formValid.hideInputError(formElement, inputElement, formConfig);
  });
}

// ------ Первоначальная загрузка карточек v3 --------
const cardsList = new Section({
  data: initialCards,
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

// отрисовка карточек v3
cardsList.renderItems();

// ------ Первоначальная загрузка карточек v3 --------

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
    newUserInfo.setUserInfo(formData);
  }
});
popupEdit.setEventListeners();
// ---------   экземпляр класса PopupWithForm ------------

// ---------   экземпляр класса PopupWithForm ------------
const popupAdd = new PopupWithForm({
  formSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
  // отрисовка новой карточки
  cardsList.renderItems([{ name: formData.place, link: formData.url }]);
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

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', prepareEditFormToOpened);

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', prepareAddFormToOpened);
