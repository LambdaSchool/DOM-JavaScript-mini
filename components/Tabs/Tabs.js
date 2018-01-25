
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }
  select() {
    // should use classList
    this.element.classList.add('Tabs__item-selected');
  }
  deselect() {
    // should use classList
    this.element.classList.remove('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
  };
  select() {
    // select this link
    this.element.classList.add('Tabs__link-selected');
  }
  deselect() {
    // deselect this link
    this.element.classList.remove('Tabs__link-selected');
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = link.dataset.tab - 1;
        this.updateActive(index);
        this.links[index].select();
        this.items[index].select();
      });
      return new TabLink(link);
    });
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).map((item) => {
      return new TabItem(item);
    });
    this.activeLink = this.links[0];
    this.activeItem = this.items[0];
    this.init();
  }
  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
    this.activeItem.select();
  }
  updateActive(index) {
    // deselect the old active link & item
    this.activeLink.deselect();
    this.activeItem.deselect();
    // assign the new active link & item
    this.activeLink = this.links[index];
    this.activeItem = this.items[index];
  }
  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
