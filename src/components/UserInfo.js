export class UserInfo {
	constructor(userNameSelector, abuotInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._abuotInfoSelector = abuotInfoSelector;
  }
  // публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    // создаём пустой объект
    this._formValues = {};
    // наполняем данными пользователя
    // ...
    // возвращаем объект значений
    return this._formValues;
  }
  // публичный метод, принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    // 
  }
}
