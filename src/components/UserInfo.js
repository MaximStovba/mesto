// UserInfo.js

export class UserInfo {
	constructor({
    userNameSelector,
    aboutInfoSelector,
    popupTextTypeName,
    popupTextTypeAbout,
    profileTitle,
    profileSubtitle,
    profileAvatar,
  }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutInfoElement = document.querySelector(aboutInfoSelector);
    this._popupTextTypeName = popupTextTypeName;
    this._popupTextTypeAbout = popupTextTypeAbout;
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    this._formValues = {};
    this._formValues[this._popupTextTypeName.name] = this._profileTitle.textContent;
    this._formValues[this._popupTextTypeAbout.name] = this._profileSubtitle.textContent;

    return this._formValues;
  }
  // публичный метод, принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    this._userNameElement.textContent = formData.name;
    this._aboutInfoElement.textContent = formData.about;
    this._profileAvatar.src = formData.avatar;
    this._profileAvatar.alt = formData.name;
  }
}
