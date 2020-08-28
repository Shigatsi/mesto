//класс Section, отвечает за отрисовку элементов на странице

export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;//CALLBACK
    this._containerSelector = document.querySelector(containerSelector);

  }

    renderItems() {
      this._items.forEach((item) =>{
        this._renderer(item);
      })
  }

  //публичный метод: принимает DOM-элемент и добавляет в контейнер
  addItem(element, initial) {
    if (initial){
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }

}
