const content = document.querySelector('.content');
const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
const addButton = content.querySelector('.profile__add-button'); // Находим кнопку добавления карточки
const closeEditFormButton = content.querySelector('.popup__btn-close_formtype_edit'); // Находим кнопку закрытия попапа редактирования профиля
const closeAddFormButton = content.querySelector('.popup__btn-close_formtype_add'); // Находим кнопку закрытия попапа добавления карточки
const formEditElement = content.querySelector('.popup__container_formtype_edit'); // Находим форму редактирования профиля
const formAddElement = content.querySelector('.popup__container_formtype_add'); // Находим форму добавления карточки
let profileTitle = content.querySelector('.profile__title'); // Находим заголовок "Имени"
let profileSubtitle = content.querySelector('.profile__subtitle'); // Находим заголовок "О себе"
let profileAvatar = content.querySelector('.profile__avatar'); // Находим аватар профиля
let popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имя"
let popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"
let popupTextTypePlace = content.querySelector('.popup__text_type_place'); // Находим поле ввода "Название места"
let popupTextTypeUrl = content.querySelector('.popup__text_type_url'); // Находим поле ввода "Ссылка на картинку"
const cardTemplate = document.querySelector('#card').content; // Находим шаблон "карточки"
const cardsContainer = document.querySelector('.elements'); // Элемент куда будем вставлять "карточки"
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

function addNewCard(item) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__title').textContent = item.name;
  // отображаем на странице в начале блока
  cardsContainer.prepend(cardElement);
}
// наполняем страницу карточками из массива
initialCards.forEach(function (card) {
  addNewCard(card);
});

function popupOpeneClose(typeOfButton) {
  switch (typeOfButton) {
    case 'editButton':
      if (popUpEdit.classList.contains('popup_status_profile-closed')) {
        // действия при открытии
        popUpEdit.classList.remove('popup_status_profile-closed');
        popUpEdit.classList.add('popup_status_profile-opened');
        popupTextTypeName.value = profileTitle.textContent;
        popupTextTypeAbout.value = profileSubtitle.textContent;
      } else if (popUpEdit.classList.contains('popup_status_profile-opened')) {
        // действия при закрытии
        popUpEdit.classList.remove('popup_status_profile-opened');
        popUpEdit.classList.add('popup_status_profile-closed');
      }
      break;
    case 'addButton':
      if (popUpAdd.classList.contains('popup_status_item-closed')) {
        // действия при открытии
        popUpAdd.classList.remove('popup_status_item-closed');
        popUpAdd.classList.add('popup_status_item-opened');
      } else if (popUpAdd.classList.contains('popup_status_item-opened')) {
        // действия при закрытии
        popUpAdd.classList.remove('popup_status_item-opened');
        popUpAdd.classList.add('popup_status_item-closed');
      }
      break;
    case 'closeEditFormButton':
      popUpEdit.classList.remove('popup_status_profile-opened');
      popUpEdit.classList.add('popup_status_profile-closed');
      break;
    case 'closeAddFormButton':
      popUpAdd.classList.remove('popup_status_item-opened');
      popUpAdd.classList.add('popup_status_item-closed');
  }
}

function formEditSubmitHandler (evt) { // Обработчик «отправки» формы редактирования профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение Имя
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение О себе
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  popupOpeneClose('closeEditFormButton'); // Закрываем форму редактирования профиля
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  const initialCard = {};
  initialCard.name = popupTextTypePlace.value; // сохраняем данные карточки - место
  initialCard.link = popupTextTypeUrl.value; // сохраняем данные карточки - ссылка на изображение
  addNewCard(initialCard);
  popupOpeneClose('closeAddFormButton'); // Закрываем форму добавления карточки
}

// слушатель открытия формы редактирования профиля
editButton.addEventListener('click', function (evt) {
  console.log('Кликнули по элементу editButton');
  popupOpeneClose('editButton');
});

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', function (evt) {
  console.log('Кликнули по элементу addButton');
  popupOpeneClose('addButton');
});

// слушатель закрытия формы редактирования профиля
closeEditFormButton.addEventListener('click', function (evt) {
  console.log('Кликнули по элементу closeEditFormButton');
  popupOpeneClose('closeEditFormButton');
});

// слушатель закрытия формы добавления карточки
closeAddFormButton.addEventListener('click', function (evt) {
  console.log('Кликнули по элементу closeAddFormButton');
  popupOpeneClose('closeAddFormButton');
});

// Прикрепляем обработчик к форме редактирования профиля
formEditElement.addEventListener('submit', formEditSubmitHandler);

// Прикрепляем обработчик к форме добавления карточки
formAddElement.addEventListener('submit', formAddSubmitHandler);
