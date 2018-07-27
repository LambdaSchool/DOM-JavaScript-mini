class TabItem {
  constructor(element) { this.element = element; }
  select() { this.element.classList.add('Tabs__item-selected'); }
  deselect() { this.element.classList.remove('Tabs__item-selected'); }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    console.log(this.element.dataset.tab);
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    this.element.classList.add('Tabs__link-selected');
    this.tabItem.select();
  }
  deselect() {
    this.element.classList.remove('Tabs__link-selected');
    this.tabItem.deselect();
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => new TabLink(link, this));
    this.activeLink = this.links[0];
    this.init();
  }

  init() { this.activeLink.select(); }

  updateActive(newActive) {
    this.activeLink.deselect();
    this.activeLink = newActive;
    this.activeLink.select();
  }

  getTab(data) { return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`); }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
