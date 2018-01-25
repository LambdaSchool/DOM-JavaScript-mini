
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
  this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
    // should use classList
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
    // should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.tabItem = new TabItem(this.tabItem);
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    this.element.classList.add(".Tabs__link-selected");
    this.tabItem.select()
    // select this link
    // select the associated tab
  }

  deselect() {
    this.element.classList.remove(".Tabs__link-selected")
    this.tabItem.deselect();
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
    thsi.activeLink.tabItem.select();
    // select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.activeLink.deselect();
    this.activeLink = newActive;
    // deselect the old active link
    // assign the new active link
  }

  getTab(data) {return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
    // use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
