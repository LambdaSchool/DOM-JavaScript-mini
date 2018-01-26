
class TabItem {
  constructor(element) {
    this.element = element;// attach dom element to object
  }

  select() {
    this.element.classList.toggle("Tabs__item-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
    this.element.addEventListener('click', (event) => {
      event.tabData = this.element.dataset.tab;
    });
  };

  select() {
    this.element.classList.toggle("Tabs__link-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attach dom node to object
    this.activeData = null;

    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});

    this.items = this.element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});

    this.element.addEventListener("click", (event) => {
      if (event.tabData !== undefined) {
        this.updateActive(event.tabData);
        event.stopPropagation();
      }
    });

    this.init();
  }
  
  init() {
    // select the first link and tab upon ititialization
    this.activeData = this.element.querySelector(".Tabs__link-default");
    this.activeData = this.activeData.dataset.tab;
    this.updateActive(this.activeData);
  }

  updateActive(data) {
    if (this.activeData !== null) {
      this.links[this.activeData].deselect();
      this.items[this.activeData].deselect();
    }
    this.links[data].select();
    this.items[data].select();
    this.activeData = data;
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
