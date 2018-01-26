
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    this.element.classList.add('Tabs__item-selected');
  }

  deselect() {
    // should use classList
    this.element.classList.remove('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
  };

  select() {
    // select this link
    this.element.classList.add('Tabs__link-selected')
    // select the associated tab
  }

  deselect() {
    // deselect this link
    this.element.classList.remove('Tabs__link-selected');
    // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = this.element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link);
    });
    this.links.forEach((link) => { // give each link its own tabItem (replacing line 25 of original)
      link.tabItem = this.getTab(link.element.dataset.tab); // replace line 23
      link.tabItem = new TabItem(link.tabItem); // replace line 25
      link.element.addEventListener('click', () => { // replace event listener from 26-29
        this.updateActive(link);
        link.select();
        link.tabItem.select(); // replace line 28
      });
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
    this.activeLink.tabItem.select();  //need for replacing line 28 as well
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect();
    this.activeLink.tabItem.deselect(); // replace line 34
    // assign the new active link
    this.activeLink = newActive;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
