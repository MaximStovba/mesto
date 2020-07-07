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
  profileTitle,
  profileSubtitle,
  profileAvatar,
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
  popupBigImage,
  popupFigcaption,
} from '../utils/constants.js';

// создаем экземпляр класса UserInfo ---------
const newUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  aboutInfoSelector: '.profile__subtitle',
  popupTextTypeName: popupTextTypeName,
  popupTextTypeAbout: popupTextTypeAbout,
  profileTitle: profileTitle,
  profileSubtitle: profileSubtitle,
  profileAvatar: profileAvatar,
});
// создаем экземпляр класса UserInfo ---------

// ------------ Api ----------- //
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: '71b905c5-e266-4c23-af42-a4b6735dea36',
});

// --- экземпляр класса Card --- //
const card = new Card({
  //  item: item,
    cardSelector: '#card',
    handleCardClick: (cardData) => {
      popupImage.open(cardData);
    },
    handleTrashBtnClick: (cardElement, cardId) => {
      popupImgDelete.open(cardElement, cardId);
    }
  });
// --- экземпляр класса Card --- //

// функция генерации карточки
function addCards(item, userId) {
  const cardElement = card.generateCard(item, userId);
  return cardElement;
}

// ---------- экземпляр класса Section --------- //
const cardsList = new Section({
  renderer: (item, userId) => {
    const newCard = addCards(item, userId);
    cardsList.setItems(newCard);
    },
  },
  cardListSection
);
// ---------- экземпляр класса Section --------- //


// загружаем данные пользователя с сервера
// загружаем карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    newUserInfo.setUserInfo(userInfo);
    cardsList.renderItems(cards, userInfo._id);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });


// Для каждой проверяемой формы создаем экземпляр класса
  // вызываем метод enableValidation
const formEditValid = new FormValidator(
  formConfig,
  formEditElement,
  inputListEditForm,
  saveButton
);
formEditValid.enableValidation();

const formAddValid = new FormValidator(
  formConfig,
  formAddElement,
  inputListAddForm,
  createButton
);
formAddValid.enableValidation();

const formAvatarValid = new FormValidator(
  formConfig,
  formAvatarElement,
  inputListAvatarForm,
  patchButton
);
formAvatarValid.enableValidation();

// ---------   экземпляр класса PopupWithForm (Edit Profile) ------------
const popupEdit = new PopupWithForm({
  formSelector: '.popup_type_edit',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    // меняем название кнопки сабмита перед началом загрузки
    // добавляем надпись "Сохранение..."
    popupEdit.setBtnStartLoading();
    // сохранение данных профиля на сервере v2
    api.patchUserInfo(formData)
      .then((data) => {
        // добавление данных профиля на страницу
        // после успешного ответа сервера
        newUserInfo.setUserInfo(data);
        // закрываем попап
        popupEdit.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        // меняем название кнопки сабмита при завершении загрузки
        popupEdit.setBtnEndLoading();
      });
  },
  submitButton: saveButton
});
// ---------   экземпляр класса PopupWithForm (Edit Profile) ------------

// ---------   экземпляр класса PopupWithForm (Add Card) ------------
const popupAdd = new PopupWithForm({
  formSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    // меняем название кнопки сабмита перед началом загрузки
    // добавляем надпись "Сохранение..."
    popupAdd.setBtnStartLoading();
    // загрузка новой карточки
    api.postNewCard(formData)
      .then((data) => {
        // отрисовка новой карточки
        const newCard = addCards(data, data.owner._id);
        cardsList.setNewItem(newCard);
        // закрываем попап после успешного ответа сервера
        popupAdd.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        // меняем название кнопки сабмита при завершении загрузки
        popupAdd.setBtnEndLoading();
      });
  },
  submitButton: createButton
});
// ---------   экземпляр класса PopupWithForm (Add Card) ------------

// ---------   экземпляр класса PopupWithForm (Patch Avatar) ------------
const popupPatchAvatar = new PopupWithForm({
  formSelector: '.popup_type_avatar',
  handleFormSubmit: (formData) => {
    // меняем название кнопки сабмита перед началом загрузки
    // добавляем надпись "Сохранение..."
    popupPatchAvatar.setBtnStartLoading();
    // обновляем аватар пользователя на сервере
    api.patchAvatar(formData.url)
      .then((data) => {
        // обновляем аватар пользователя на странице
        // после удачного ответа сервера (newUserInfo)
        newUserInfo.setNewAvatar(data.avatar);
        console.log('Успешно: ', data.avatar);
        // закрываем попап после успешного ответа сервера
        popupPatchAvatar.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        // меняем название кнопки сабмита при завершении загрузки
        popupPatchAvatar.setBtnEndLoading();
      });
  },
  submitButton: patchButton
});
// ---------   экземпляр класса PopupWithForm (Patch Avatar) ------------


// ---------   экземпляр класса PopupWithImage ------------
export const popupImage = new PopupWithImage({
  formSelector: '.popup_type_image',
  popupBigImage: popupBigImage,
  popupFigcaption: popupFigcaption,
  });
// ---------   экземпляр класса PopupWithImage ------------

// ---------   экземпляр класса PopupDeleteCard (удаление картоки) ------------
export const popupImgDelete = new PopupDeleteCard({
  formSelector: '.popup_type_del',
  handleFormSubmit: (cardId, cardElement) => {
    // удаляем карточку с сервера
    api.deleteMyCard(cardId)
      .then((data) => {
        console.log(data);
        // удаляем карточку со страницы
        // после удачного ответа сервера
        cardElement.querySelector('.card__trash').closest('.card').remove();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
    }
  });
// ---------   экземпляр класса PopupDeleteCard (удаление картоки) ------------

// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened() {
  // отображаем в форме информацию из профиля
  const formValues = newUserInfo.getUserInfo();
  popupTextTypeName.value = formValues.name;
  popupTextTypeAbout.value = formValues.about;
  // проводим валидацию полей ввода формы "редактирования профиля"
  formEditValid.clearErrors();
  // делаем кнопку активной при открытии
  formEditValid.submitButtonState();
  // тогглим попап
  popupEdit.open();
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened() {
  // сбрасываем все поля формы перед открытием
  formAddElement.reset();
  // проводим валидацию полей ввода формы "создания карточки"
  formAddValid.clearErrors();
  // делаем кнопку неактивной при открытии
  formAddValid.submitButtonState();
  // тогглим попап
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
  formAvatarValid.clearErrors();
  // делаем кнопку неактивной при открытии
  formAvatarValid.submitButtonState();
  // тогглим попап
  popupPatchAvatar.open();
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', prepareEditFormToOpened);

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', prepareAddFormToOpened);

// слушатель открытия формы смены аватара
avatarButton.addEventListener('click', preparePatchFormToOpened);
