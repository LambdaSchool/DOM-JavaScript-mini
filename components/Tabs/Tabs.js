class TabItem {
  constructor(element) {
    this.element = element;
    // attach dom element to object. Example in Tabs class
  }

  select() {
    this.element = element.querySelectorAll(".Tabs__item-selected");
    // should use classList
  }

  deselect() {
    this.element = element.querySelectorAll(".Tabs__item");
    // should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);
    this.tabItem = new TabItem(this.tabItem, this);
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    this.element = element.querySelector(".Tabs__link-selected");
    this.tabs = element.querySelector(".Tabs__item-selected")
    // select this link
    // select the associated tab
  }

  deselect() {
    this.element = element.querySelector(".Tabs__item");
    this.tabs = element.querySelector(".Tabs__item");
    // deselect this link
    // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
    // use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
