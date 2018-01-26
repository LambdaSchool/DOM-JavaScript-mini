
class TabItem {
  constructor(element) {
    this.element = element; // attach dom element to object. Example in Tabs class
  }

  select() {
    this.element.classList.add("Tabs__item-selected") // should use classList
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected") // should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element; // attach dom element to object
    this.tabs = parent; // attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab); // assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
  };

  select() {
    this.element.classList.add("Tabs__link-selected"); // select this link
    this.tabItem.select(); // select the associated tab
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected"); // deselect this link
    this.tabItem.deselect();  // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.tabItems = element.querySelectorAll(".Tabs__item")
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.tabItems = Array.from(this.tabItems).map((item) => {
      return new TabItem(item);
    })
    this.activeLink = this.links[0];
    this.activeTab = this.tabItems[0];
    this.init();
    this.element.addEventListener('click', (event) => {
      let clickedTabIndex = event.target.dataset.tab;
      let clickedTabLink = this.element.querySelector(`.Tabs__link[data-tab="${clickedTabIndex}"]`)
      let clickedTabItem = this.element.querySelector(`.Tabs__item[data-tab="${clickedTabIndex}"]`);
      this.activeLink.element.classList.remove("Tabs__link-selected");
      this.activeTab.element.classList.remove("Tabs__item-selected");
      this.activeLink = this.links[clickedTabIndex - 1];
      this.activeTab = this.tabItems[clickedTabIndex - 1];
      clickedTabItem.classList.add("Tabs__item-selected");
      clickedTabLink.classList.add("Tabs__link-selected");
    });
  }

  init() {
    this.activeLink.select(); // select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.activeLink.deselect(); // deselect the old active link
    this.activeLink = newActive; // assign the new active link
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`); // use the tab item classname and the data attribute to select the proper tab
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
