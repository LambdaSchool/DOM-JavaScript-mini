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
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");// deselect this link
  }
}

// "Try to leverage the fact that the link and the item share some data,
// and make the link ignorant of the item."

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map(link => {
      return new TabLink(link);
    });
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).map(item => {
      return new TabItem(item);
    });
    document.addEventListener("click", () => {
      if (event.target.dataset.tab) {
        const data = event.target.dataset.tab;
        let tabLink = this.element.querySelector(`.Tabs__link[data-tab="${data}"]`);
        tabLink = new TabLink(tabLink);
        let tabItem = this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
        tabItem = new TabItem(tabItem);
        this.updateActive(tabLink, tabItem);
        tabLink.select();
        tabItem.select();
      }
    });

    this.activeLink = this.links[0];
    this.activeItem = this.items[0];
    this.init();
  }

  init() {
    this.activeLink.select();// select the first link and tab upon ititialization
    this.activeItem.select();
  }

  updateActive(newActiveLink, newActiveItem) {
    //console.log(newActiveLink, newActiveItem);
    this.activeLink.deselect();// deselect the old active link
    this.activeItem.deselect();
    this.activeLink = newActiveLink;// assign the new active link
    this.activeItem = newActiveItem;
    this.activeLink.select();
    this.activeItem.select();
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__link[data-tab="${data}"]`);
    // use the tab item classname and the data attribute to select the proper tab
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));