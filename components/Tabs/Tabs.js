
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
    this.element = element;
    this.tabs = parent;
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);
    this.tabItem = new TabItem(tabItem);
    this.element.addEventListener('click', function(event) {
      this.tabs.updateActive(this);
      this.select();
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
    this.element = element;
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map(function(link) {
      return new TabLink(link, this);
    });
    this.activeLink = this.links [0];
    this.init();
  }
  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    this.activeLink.deleteCaption();
    this.activeLink = newActive;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__ite[dat-tab='${data}']`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(function(tabs) {
  new Tabs(tabs);
});
