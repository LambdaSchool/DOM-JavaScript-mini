
class TabItem {
  constructor(element) {
    this.element;
  }

  select() {
    this.element.classList.remove('.Tabs__link');
    this.element.classList.add('.Tabs__link-selected');// should use classList
  }

  deselect() {
    this.element.classList.remove('.Tabs__link-selected');
    this.element.classList.add('.Tabs__link');// should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = parent.getTab();// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.TabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    this.element.classList.remove('.Tabs__item');// select this link
    this.element.classList.add('.Tabs__item-selected');// select the associated tab
  }

  deselect() {
    this.element.classList.remove('.Tabs__item-selected');// select this link
    this.element.classList.add('.Tabs__item');// deselect the associated tab
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
    this.element.classList.add('.Tabs__link-selected');
    this.element.classList.add('.Tabs__item-selected');// select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.links.deslect(this.activeLink)// deselect the old active link
    this.links.select(newActive)// assign the new active link
  }

  getTab(data) {
    return this.element.querySelector('.Tabs_item[data-tab = ${data}]');// use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
