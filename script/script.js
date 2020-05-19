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

const popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имя"
const popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"
const popupTextTypePlace = content.querySelector('.popup__text_type_place'); // Находим поле ввода "Название места"
const popupTextTypeUrl = content.querySelector('.popup__text_type_url'); // Находим поле ввода "Ссылка на картинку"
const popupBigImage = content.querySelector('.popup__big-image'); // Находим большое изображение
const popupFigcaption = content.querySelector('.popup__figcaption'); // Находим подпись большого изображения

const cardTemplate = document.querySelector('#card').content; // Находим шаблон "карточки"
const cardsContainer = document.querySelector('.card-container'); // Элемент куда будем вставлять "карточки"

const setObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  formEditClass: 'popup__container_formtype_edit',
  formAddClass: 'popup__container_formtype_add',
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

// Функция закрытия формы
function closePopup (evt, formElement) {
  if ((evt.target.classList.contains('popup')) || (evt.key === 'Escape')) {
    togglePopup(formElement);
  }
}

// Функция определения открытой формы
function whatFormToClose (evt) {
  const searchPopupList = content.querySelectorAll('.popup');
  searchPopupList.forEach((formElement) => {
    if (!formElement.classList.contains('popup_hidden')) {
      closePopup(evt, formElement);
    }
  });
}

// Функция отображения в форме информации из профиля
function showInfoOfProfile () {
  popupTextTypeName.value = profileTitle.textContent;
  popupTextTypeAbout.value = profileSubtitle.textContent;
}

// Функция устанавки / снятия слушатели Esc и Overlay
function toggleEventListeners (popupElement) {
  if (popupElement.classList.contains('popup_hidden')) {
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

// Функция открытия и закрытия pop-up
function togglePopup(popupElement) {
  // Находим все поля внутри форм, делаем из них массив
  const inputListEditForm = Array.from(formEditElement.querySelectorAll('.popup__text'));
  const inputListAddForm = Array.from(formAddElement.querySelectorAll('.popup__text'));

  // проверяем, что это форма "редактирования профиля" и она скрыта
  if ((popupElement.classList.contains('popup_type_edit')) && (popupElement.classList.contains('popup_hidden'))) {
    // отображаем в форме информацию из профиля
    showInfoOfProfile();
    // проводим валидацию полей ввода формы "редактирования профиля"
    toggleButtonState(inputListEditForm, formEditElement);
  }

  // проверяем, что это форма "создания карточки" и она скрыта
  if ((popupElement.classList.contains('popup_type_add')) && (popupElement.classList.contains('popup_hidden'))) {
    // проводим валидацию полей ввода формы "создания карточки"
    toggleButtonState(inputListAddForm, formAddElement);
    // сбрасываем все поля формы
    formAddElement.reset();
  }

  // проверяем, скрыта или открыта форма и устанавливаем / снимаем слушатели Esc и Overlay
  toggleEventListeners(popupElement);

  // тогглим попап
  popupElement.classList.toggle('popup_hidden');
}

// функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// функция открытия попапа с большым изображением
function openPopupImg(evt) {
  popupBigImage.src = evt.target.src;
  popupBigImage.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  togglePopup(popUpImg); // открываем попап с большым изображением
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
editButton.addEventListener('click', () => togglePopup(popUpEdit));

// слушатель открытия формы добавления карточки
addButton.addEventListener('click', () => togglePopup(popUpAdd));

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
publicCards(loadCards(initialCards));
