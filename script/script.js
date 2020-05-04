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
const newCard = [{}];
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
function togglePopup(popupElement) {
  // условие для попапа редактирования профиля
  if (popupElement.classList.contains('profile__edit-button')) {
    popupTextTypeName.value = profileTitle.textContent; // отображение в форме информации из профиля при нажатии кнопки "редактировать"
    popupTextTypeAbout.value = profileSubtitle.textContent;
  }
  // условие для попапа редактирования профиля
  if (popupElement.classList.contains('profile__edit-button') || popupElement.classList.contains('popup__btn-close_formtype_edit') || popupElement.classList.contains('popup__container_formtype_edit')) {
    popUpEdit.classList.toggle('popup_hidden'); // попап редактирования профиля
  }
  // условие для попапа добавления новой карточки
  if (popupElement.classList.contains('profile__add-button') || popupElement.classList.contains('popup__btn-close_formtype_add') || popupElement.classList.contains('popup__container_formtype_add')) {
    popupTextTypePlace.value = ''; // очистка значений полей в форме создания новой карточки
    popupTextTypeUrl.value = '';
    popUpAdd.classList.toggle('popup_hidden'); // попап добавления новой карточки
  }
  // условие для попапа просмотра изображения
  if (popupElement.classList.contains('elements__image') || popupElement.classList.contains('popup__btn-close_formtype_image')) {
    popUpImg.classList.toggle('popup_hidden'); // попап просмотра изображения
  }
}

// функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('elements__like_active');
}

// функция удаления карточки
function delCard(evt) {
  // снимаем обработчики с карточки
  evt.target.closest('.elements__element').querySelector('.elements__like').removeEventListener('click', toggleLike);
  evt.target.closest('.elements__element').querySelector('.elements__trash').removeEventListener('click', delCard);
  evt.target.closest('.elements__element').querySelector('.elements__image').removeEventListener('click', openPopupImg);
  evt.target.closest('.elements__element').remove(); // удаляем карточку
}

// функция открытия попапа с большым изображением
function openPopupImg(evt) {
  popupBigImage.src = evt.target.src;
  popupBigImage.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  togglePopup(evt.target); // открываем попап
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
  const taskElements = cards.map(card => {
    return createCard(card);
  });
  // добавим элементы в DOM, «разложив» массив
  cardsContainer.prepend(...taskElements);
}

function formEditSubmitHandler (evt) { // Обработчик «отправки» формы редактирования профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение "Имя"
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение "О себе"
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  togglePopup(evt.target); // Закрываем форму редактирования профиля
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  newCard[0].name = popupTextTypePlace.value; // записываем данные новой карточки - место
  newCard[0].link = popupTextTypeUrl.value; // записываем данные карточки - ссылка на изображение
  // Добавляем новую карточку в разметку - publicCards внутри вызывает createCard
  publicCards(newCard);
  togglePopup(evt.target); // Закрываем форму добавления карточки
}

// слушатель открытия формы редактирования профиля
// открываем попап редактирования профиля
editButton.addEventListener('click', (evt) => togglePopup(evt.target));

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', (evt) => togglePopup(evt.target));

// слушатель закрытия формы редактирования профиля
closeEditFormButton.addEventListener('click', (evt) => togglePopup(evt.target));

// слушатель закрытия формы добавления карточки
closeAddFormButton.addEventListener('click', (evt) => togglePopup(evt.target));

// слушатель закрытия формы с большим изображением
closeImgFormButton.addEventListener('click', (evt) => togglePopup(evt.target));

// Прикрепляем обработчик к форме редактирования профиля
formEditElement.addEventListener('submit', formEditSubmitHandler);

// Прикрепляем обработчик к форме добавления карточки
formAddElement.addEventListener('submit', formAddSubmitHandler);

// первоначальная загрузка карточек
publicCards(initialCards);
