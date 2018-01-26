
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
    this.element.classList.add('Tabs__link-selected')
    // select the associated tab
  }

  deselect() {
    // deselect this link
    this.element.classList.remove('Tabs__link-selected');
    // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = this.element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link);
    });
    this.items = this.element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).map((item) => {
      return new TabItem(item);
    });
    this.element.addEventListener('click', (event) => {
      if (event.target.dataset.tab) {
        let idNumber = event.target.dataset.tab;
        let currentItem = this.items[idNumber - 1];
        let currentLink = this.links[idNumber - 1];
        this.updateActive(currentLink, currentItem);
        currentLink.select();
        currentItem.select();
      }
    });
    this.activeLink = this.links[0];
    this.activeItem = this.items[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
    this.activeItem.select();  //need for replacing line 28 as well
  }

  updateActive(newActiveLink, newActiveItem) {
    // deselect the old active link + item
    this.activeLink.deselect();
    this.activeItem.deselect(); // replace line 34
    // assign the new active link
    this.activeLink = newActiveLink;
    this.activeItem = newActiveItem;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
