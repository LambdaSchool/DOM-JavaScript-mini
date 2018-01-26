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
    this.element = element; // attach dom element to object
  };

  select() {
    // select this link
    this.element.classList.add('Tabs__link-selected');  
  }

  deselect() {
    // deselect this link
    this.element.classList.remove('Tabs__link-selected');
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.element.addEventListener('click', (event) => {
      this.updateActive(event.target.dataset.tab);
      event.stopPropagation();
    });
    // retrieve link nodes
    this.links = element.querySelectorAll(".Tabs__link");
    //** return an array of link object
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });

    //** retrieve all tabs item nodes
    this.tabItems = element.querySelectorAll(".Tabs__item");
    //** return an array of tab items
    this.tabItems = Array.from(this.tabItems).map((item) => {
      return new TabItem(item);
    });

    //** assign the first link and tab item in the array to be active / for tracking
    this.activeLink = this.links[0];
    this.activeItem = this.tabItems[0];
    //** initiate the first active link and tab
    this.init();
  }

  init() {
    // select the first link and tab item to be active
    this.links[0].element.classList.add('Tabs__link-selected');
    this.tabItems[0].element.classList.add('Tabs__item-selected');
  }

  updateActive(index) {
    // update active link
    if(index){
      this.activeLink.deselect();
      this.links[index-1].select();
      this.activeLink = this.links[index-1];
      // update active tab item
      this.activeItem.deselect();
      this.tabItems[index-1].select();
      this.activeItem = this.tabItems[index-1];
      }
  }
}

let tabs = document.querySelectorAll(".Tabs");

Array.from(tabs).forEach((tabs) => {
  new Tabs(tabs)
});