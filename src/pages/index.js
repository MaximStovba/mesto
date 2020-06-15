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
  formEditElement,
  formAddElement,
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

// создаем экземпляр класса UserInfo ---------
const newUserInfo = new UserInfo({
  userNameSelector: '.popup__text_type_name',
  aboutInfoSelector: '.popup__text_type_about'
});
// создаем экземпляр класса UserInfo ---------

// ---------   экземпляр класса PopupWithForm ------------
const popupEdit = new PopupWithForm({
  formSelector: '.popup_type_edit',
  closeButtonSelector: '.popup__btn-close_formtype_edit',
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
function prepareEditFormToOpened() {
  // отображаем в форме информацию из профиля
  newUserInfo.getUserInfo();
  // проводим валидацию полей ввода формы "редактирования профиля"
  checkInputBeforeFormOpening(inputListEditForm, formEditElement, formEditValid);
  // делаем кнопку активной при открытии
  saveButton.classList.remove(formConfig.inactiveButtonClass);
  // тогглим попап v2
  popupEdit.openPopup();
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened() {
  // сбрасываем все поля формы
  formAddElement.reset();
  // проводим валидацию полей ввода формы "создания карточки"
  checkInputBeforeFormOpening(inputListAddForm, formAddElement, formAddValid);
  // тогглим попап v2
  popupAdd.openPopup();
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', prepareEditFormToOpened);

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', prepareAddFormToOpened);

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
