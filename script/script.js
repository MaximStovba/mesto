const content = document.querySelector('.content');
const popUp = content.querySelector('.popup'); // Находим pop-up
const editButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования
const closeButton = content.querySelector('.popup__icon-close'); // Находим кнопку закрытия
const saveButton = content.querySelector('.popup__btn_action_add'); // Находим кнопку сохранения
const formElement = content.querySelector('.popup__container'); // Находим форму
let profileTitle = content.querySelector('.profile__title'); // Находим заголовок "Имени"
let profileSubtitle = content.querySelector('.profile__subtitle'); // Находим заголовок "О себе"
let popupTextTypeName = content.querySelector('.popup__text_type_name'); // Находим поле ввода "Имени"
let popupTextTypeAbout = content.querySelector('.popup__text_type_about'); // Находим поле ввода "О себе"
let profileAvatar = content.querySelector('.profile__avatar'); // Находим аватар профиля

function popupOpeneClose() {
  if (popUp.classList.contains('popup_status_closed')) {
    // действия при открытии
    popUp.classList.remove('popup_status_closed');
    popUp.classList.add('popup_status_opened');
    popupTextTypeName.value = profileTitle.textContent;
    popupTextTypeAbout.value = profileSubtitle.textContent;
  } else {
    // действия при закрытии
    popUp.classList.remove('popup_status_opened');
    popUp.classList.add('popup_status_closed');
  }
}

function formSubmitHandler (evt) { // Обработчик «отправки» формы
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = popupTextTypeName.value; // Сохраняем значение Имя
  profileSubtitle.textContent = popupTextTypeAbout.value; // Сохраняем значение О себе
  profileAvatar.setAttribute('alt', popupTextTypeName.value); // Изменяем "альт" аватара профиля
  popupOpeneClose(); // Закрываем форму
}

editButton.addEventListener('click', popupOpeneClose); // слушатель открытия формы
closeButton.addEventListener('click', popupOpeneClose); // слушатель закрытия формы
// Прикрепляем обработчик к форме, следит за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
