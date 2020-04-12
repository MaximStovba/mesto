let content = document.querySelector('.content');
let popUp = content.querySelector('.popup');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = content.querySelector('.popup__icon-close');
let saveButton = content.querySelector('.popup__btn_action_add');
let profileTitle = content.querySelector('.profile__title');
let profileSubtitle = content.querySelector('.profile__subtitle');
let popupTextTypeName = content.querySelector('.popup__text_type_name');
let popupTextTypeAbout = content.querySelector('.popup__text_type_about');
// Находим форму в DOM
let formElement = content.querySelector('.popup__container');

function openePopup() {
  popUp.classList.remove('popup_status_closed');
  popUp.classList.add('popup_status_opened');
  popupTextTypeName.value = profileTitle.textContent;
  popupTextTypeAbout.value = profileSubtitle.textContent;
}

function closePopup() {
  popUp.classList.remove('popup_status_opened');
  popUp.classList.add('popup_status_closed');
}

function savePopup() {
  popUp.classList.remove('popup_status_opened');
  popUp.classList.add('popup_status_closed');
  profileTitle.textContent = popupTextTypeName.value;
  profileSubtitle.textContent = popupTextTypeAbout.value;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
}

editButton.addEventListener('click', openePopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', savePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
