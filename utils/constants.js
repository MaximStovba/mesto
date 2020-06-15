export const content = document.querySelector('.content');
export const popUpEdit = content.querySelector('.popup_type_edit'); // Находим pop-up редактирования профиля
export const popUpAdd = content.querySelector('.popup_type_add'); // Находим pop-up добавления карточки
export const popUpImg = content.querySelector('.popup_type_image'); // Находим pop-up открытия картинки

export const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
export const addButton = content.querySelector('.profile__add-button'); // Находим кнопку добавления карточки
export const saveButton = content.querySelector('.popup__btn_action_save'); // Находим кнопку сохранения профиля

export const formEditElement = content.querySelector('.popup__container_formtype_edit'); // Находим форму редактирования профиля
export const formAddElement = content.querySelector('.popup__container_formtype_add'); // Находим форму добавления карточки

export const profileTitle = content.querySelector('.profile__title'); // Находим заголовок "Имени"
export const profileSubtitle = content.querySelector('.profile__subtitle'); // Находим заголовок "О себе"
export const profileAvatar = content.querySelector('.profile__avatar'); // Находим аватар профиля

export const popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имя"
export const popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"

export const popupBigImage = content.querySelector('.popup__big-image'); // Находим большое изображение
export const popupFigcaption = content.querySelector('.popup__figcaption'); // Находим подпись большого изображения

export const cardListSection = '.card-container'; // Селектор, куда будем вставлять "карточки" v2

// Находим все поля внутри форм, делаем из них массив
export const inputListEditForm = Array.from(formEditElement.querySelectorAll('.popup__text'));
export const inputListAddForm = Array.from(formAddElement.querySelectorAll('.popup__text'));

export const formConfig = { // настройки формы
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn_disabled',
};

export const initialCards = [
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
