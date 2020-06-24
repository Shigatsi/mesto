//класс Section, отвечает за отрисовку элементов на странице

export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  //публичный метод: отрисовка всех элементов
  renderItems() {
      this._items.forEach((item) =>{
        this._renderer(item);
      })
  }

  //публичный метод: принимает DOM-элемент и добавляет в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }

}