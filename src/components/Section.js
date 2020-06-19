export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(data=false) {
    if (data) {
      data.forEach(item => this._renderer(item));
    } else {
      this._renderedItems.forEach(item => this._renderer(item));
    }
  }

  setItem(element) {
    this._container.prepend(element);
  }
}