export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data, userId) {
    if (data) {
      const revData = data.reverse();
      revData.forEach(item => this._renderer(item, userId));
    } else {
      this._renderedItems.forEach(item => this._renderer(item, userId));
    }
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
