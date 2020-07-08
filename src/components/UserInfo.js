// UserInfo.js
export class UserInfo {
	constructor({
    popupTextTypeName,
    popupTextTypeAbout,
    profileTitle,
    profileSubtitle,
    profileAvatar,
  }) {
    this._popupTextTypeName = popupTextTypeName;
    this._popupTextTypeAbout = popupTextTypeAbout;
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const formValues = {};
    formValues[this._popupTextTypeName.name] = this._profileTitle.textContent;
    formValues[this._popupTextTypeAbout.name] = this._profileSubtitle.textContent;

    return formValues;
  }
  // публичный метод, принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    this._profileTitle.textContent = formData.name;
    this._profileSubtitle.textContent = formData.about;
    this._profileAvatar.src = formData.avatar;
    this._profileAvatar.alt = formData.name;
  }

  // публичный метод обновления аватар пользователя на странице
  setNewAvatar(dataAvata) {
    this._profileAvatar.src = dataAvata;
  }
}
