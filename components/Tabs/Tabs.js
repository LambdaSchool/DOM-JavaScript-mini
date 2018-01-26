
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    this.element.classList.add("Tabs__item-selected");

  }

  deselect() {
    // should use classList
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
  };
  
  select() {
    this.element.classList.add("Tabs__link-selected"); // select this link
    element.querySelector(".Tabs__item").classList.add("Tabs__item-selected");
}

  deselect() {
    this.element.classList.remove("Tabs__link-selected"); // deselect this link
    element.child.classList.remove("Tabs__item-selected");
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.tabItems = element.querySelectorAll(".Tabs__item");
    this.tabItems = Array.from(this.tabItems).map((item) => {
      return new TabItem(item);
    });
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link);
    });
    this.tabItems.addEventListener('click', (event) => {
      event.stopPropagation();
      updateActive(this);
      this.select();
    });
    this.activeLink = this.links[0];
    this.init();
  }
  init() {
    // select the first link and tab upon ititialization
    this.links[0].select();
    this.tabItems[0].select();
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect();
    // assign the new active link
    this.activeLink = newActive;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
