class TabItem {
  constructor(element) {
    this.element = element; // attach dom element to object. Example in Tabs class
  }

  toggle() {
    // should use classList
    this.element.classList.toggle('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element; // attach dom element to object
    this.tabs = parent; // attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab); // assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', (event) => {
      event.stopPropagation();
      this.tabs.updateActive(this);
      this.toggle();
    });
  };

  toggle() {
    // select this link
    this.element.classList.toggle('Tabs__link-selected');
    // select the associated tab
    this.tabItem.toggle();
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll('.Tabs__link');
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon initialization
    this.activeLink.toggle();
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.toggle();
    // assign the new active link
    this.activeLink = newActive;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab='${data}']`);
  }

}

let tabs = document.querySelectorAll('.Tabs');
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
