const content = document.querySelector('.content');
const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
const popUpImg = content.querySelector('.popup_type_image'); // Находим pop-up открытия картинки

const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
const addButton = content.querySelector('.profile__add-button'); // Находим кнопку добавления карточки
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
const popupBigImage = content.querySelector('.popup__big-image'); // Находим большое изображение
const popupFigcaption = content.querySelector('.popup__figcaption'); // Находим подпись большого изображения

const cardTemplate = document.querySelector('#card').content; // Находим шаблон "карточки"
const cardsContainer = document.querySelector('.elements'); // Элемент куда будем вставлять "карточки"
const initialCard = [{}];
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

// функция открытия и закрытия pop-up
function togglePopup(targetClassName) {
  if ((targetClassName == 'profile__edit-button') || (targetClassName == 'popup__btn-close_formtype_edit') || (targetClassName == 'popup__container_formtype_edit')) {
    if (targetClassName == 'profile__edit-button') {
      popupTextTypeName.value = profileTitle.textContent;
      popupTextTypeAbout.value = profileSubtitle.textContent;
    }
    popUpEdit.classList.toggle('popup_hidden'); // переключаем класс скрытия попапа
  } else if ((targetClassName == 'profile__add-button') || (targetClassName == 'popup__btn-close_formtype_add') || (targetClassName == 'popup__container_formtype_add')) {
    popupTextTypePlace.value = '';
    popupTextTypeUrl.value = '';
    popUpAdd.classList.toggle('popup_hidden'); // переключаем класс скрытия попапа
  } else if ((targetClassName == 'elements__image') || (targetClassName == 'popup__btn-close_formtype_image')) {
    popUpImg.classList.toggle('popup_hidden'); // переключаем класс скрытия попапа
  }
}

// ------------------------------------------------------

// функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('elements__like_active');
}

// функция удаления карточки
function delCard(evt) {
  evt.target.closest('.elements__element').remove(); // удаляем карточку
  // снимаем обработчики с карточки
  evt.target.closest('.elements__element').querySelector('.elements__like').removeEventListener('click', toggleLike);
  evt.target.closest('.elements__element').querySelector('.elements__trash').removeEventListener('click', delCard);
  evt.target.closest('.elements__element').querySelector('.elements__image').removeEventListener('click', openPopupImg);
}

// функция открытия попапа с большым изображением
function openPopupImg(evt) {
  popupBigImage.src = evt.target.src;
  popupBigImage.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  togglePopup(evt.target.className); // открываем попап
}

// функция создания новой карточки
function createCard(item) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__title').textContent = item.name;
  // настройка переключения лайка
  cardElement.querySelector('.elements__like').addEventListener('click', toggleLike);
  // настройка удаления карточки
  cardElement.querySelector('.elements__trash').addEventListener('click', delCard);
  // настройка открытия попапа с большым изображением
  cardElement.querySelector('.elements__image').addEventListener('click', openPopupImg);
  // отображаем карточку на странице в начале блока
  return cardElement;
}

// функция добавления карточек в разметке
function publicCards(cards) {
  // наполняем страницу карточками из массива
  console.log(cards)
  cards.forEach(function (card) {
    cardsContainer.prepend(createCard(card)); // отображаем карточку на странице в начале блока
  });
}

function formEditSubmitHandler (evt) { // Обработчик «отправки» формы редактирования профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение "Имя"
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение "О себе"
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  togglePopup(evt.target.className.slice(17)); // Закрываем форму редактирования профиля
  // убираем первую часть строки "popup__container " = 17 символов
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  initialCard[0].name = popupTextTypePlace.value; // сохраняем данные карточки - место
  initialCard[0].link = popupTextTypeUrl.value; // сохраняем данные карточки - ссылка на изображение
  publicCards(initialCard); // добавляем карточку в разметку
  togglePopup(evt.target.className.slice(17)); // Закрываем форму добавления карточки
  // убираем первую часть строки "popup__container " = 17 символов
}

// слушатель открытия формы редактирования профиля
// открываем попап редактирования профиля
editButton.addEventListener('click', (evt) => togglePopup(evt.target.className));

// слушатель открытия формы добавления карточки
// открываем попап добавления карточки
addButton.addEventListener('click', (evt) => togglePopup(evt.target.className));

// слушатель закрытия формы редактирования профиля
// закрываем попап редактирования профиля - убираем первую часть строки "popup__btn-close " = 17 символов
closeEditFormButton.addEventListener('click', (evt) => togglePopup(evt.target.className.slice(17)));

// слушатель закрытия формы добавления карточки
// закрываем попап добавления карточки - убираем первую часть строки "popup__btn-close " = 17 символов
closeAddFormButton.addEventListener('click', (evt) => togglePopup(evt.target.className.slice(17)));

// слушатель закрытия формы с большим изображением
// закрываем попап показа большого изображения - убираем первую часть строки "popup__btn-close " = 17 символов
closeImgFormButton.addEventListener('click', (evt) => togglePopup(evt.target.className.slice(17)));

// Прикрепляем обработчик к форме редактирования профиля
formEditElement.addEventListener('submit', formEditSubmitHandler);

// Прикрепляем обработчик к форме добавления карточки
formAddElement.addEventListener('submit', formAddSubmitHandler);

// первоначальная загрузка карточек
publicCards(initialCards);
