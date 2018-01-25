class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");  
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(element.dataset);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.tabItem = new TabItem(this.tabItem);
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
    });
  };

  select() {
    this.element.classList.add("Tabs__link-selected");
    this.tabItem.select();
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");
    this.tabItem.deselect();
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.init();
  }

  init() {
    this.updateActive(this.links[0]);
  }

  updateActive(newActive) {
    this.links.forEach((link) => {
      if (link !== newActive) link.deselect();
    });
    this.activeLink = newActive;
    newActive.select();
  }

  getTab(data) {
    return Array.from(this.element.querySelectorAll(".Tabs__item")).find(item => item.dataset.tab === data.tab);
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
