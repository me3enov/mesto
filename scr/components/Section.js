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
  addItem(element, place = 'prepend') {
    place === 'append' ? this._container.append(element) : this._container.prepend(element);
  }
}