export class Section {
  //constructor for the "Section" class
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //render all items
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }

  //add item to DOM
  addItem(element) {
    this._container.prepend(element);
  }
}