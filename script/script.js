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

// Функция отображения / скрытия ошибок валидации при открытии формы
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
function togglePopup(popupElement) {
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

// функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// функция открытия попапа с большым изображением
function openPopupImg(evt) {
  popupBigImage.src = evt.target.src;
  popupBigImage.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  togglePopup(popUpImg); // открываем попап с большым изображением!
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
  togglePopup(popUpEdit); // Закрываем форму редактирования профиля!

  // проводим валидацию полей ввода формы "редактирования профиля"
  // toggleButtonState(inputListEditForm, saveButton, setObj);
}

function formAddSubmitHandler (evt) { // Обработчик «отправки» формы добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // создаем и наполняем новую карточку данными
  const userCard = createCard({ name: popupTextTypePlace.value, link: popupTextTypeUrl.value });
  // Добавляем новую карточку в разметку
  publicCards([userCard]);
  togglePopup(popUpAdd); // Закрываем форму добавления карточки!

  // проводим валидацию полей ввода формы "создания карточки"
  // toggleButtonState(inputListAddForm, createButton, setObj);

  // сбрасываем все поля
  formAddElement.reset();
}

// слушатель открытия формы редактирования профиля
// открываем попап редактирования профиля
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
publicCards(loadCards(initialCards));
