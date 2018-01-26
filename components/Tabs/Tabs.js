
class TabItem {
  constructor(element) {
    this.element = element;
    // attach dom element to object. Example in Tabs class
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
    this.data = this.element.dataset.tab;
<<<<<<< HEAD
    this.tabItem = parent.getTab(this.element.dataset.tab);
    this.tabItem = new TabItem(this.tabItem);

    this.element.addEventListener('click', () => {
      //event.stopPropogation();
=======
    this.tabItem = this.tabs.getTab(this.data);
    this.tabItem = new TabItem(this.tabItem);

    this.element.addEventListener('click', (event) => {
      event.stopPropogation();
>>>>>>> master
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    // select this link
    this.element.classList.add("Tabs__list-selected")
    // select the associated tab
    this.tabItem.select();
  }

  deselect() {
    // deselect this link
    this.element.classList.remove("Tabs__link-selected");
    // deselect the associated tab
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
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
<<<<<<< HEAD
    this.activeLink.select();
=======
    this.activeLink = this.links[0];
    this.links[0].select();
>>>>>>> master
    // select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect();
    // assign the new active link
<<<<<<< HEAD
    this.activeLink = newActive;
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
=======
    this.activeLink.newActive;
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab = "${data}"]`);
>>>>>>> master
    // use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");

tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
