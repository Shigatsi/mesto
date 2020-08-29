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

  // addItem(element, initial) {
  //   if (initial){
  //     this._containerSelector.append(element);
  //   } else {
  //     this._containerSelector.prepend(element);
  //   }
  // }

  //публичный метод: принимает DOM-элемент и добавляет в контейнер, отрисовываем карточки с сервера
  addItem(element){
    this._containerSelector.append(element);
  }
  //публичный метод: принимает DOM-элемент и добавляет в контейнер, отрисовываем новые карточки
  addUserItem(element){
      this._containerSelector.prepend(element);
  }

}
