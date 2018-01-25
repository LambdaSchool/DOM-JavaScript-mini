class TabItem {
  constructor(element) {
    this.element = element;// attach dom element to object. Example in Tabs class
    this.classList = element.classList;
  }

  select() {
    this.classList.add("Tabs__item-selected");// should use classList
  }

  deselect() {
    this.classList.remove("Tabs__item-selected");// should use classList
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
  }

  select() {
    this.element.classList.add("Tabs__link-selected");// select this link
    this.tabItem.select();// select the associated tab
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");// deselect this link
    this.tabItem.deselect();// deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link);
    });

    this.links.forEach(link => {
      link.tabItem = this.getTab(link.element.dataset.tab);
      link.tabItem = new TabItem(link.tabItem);
      link.element.addEventListener('click', () => {
        this.updateActive(link);
        link.select();
      });
    });
    
    this.activeLink = this.links[0];
    this.init();
  } 

  init() {
    this.activeLink.select();// select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.activeLink.deselect();// deselect the old active link
    this.activeLink = newActive;// assign the new active link
    this.activeLink.select();
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
    // use the tab item classname and the data attribute to select the proper tab
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));