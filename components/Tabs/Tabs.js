class TabItem {
  constructor(element) {
    this.element = element;
  }

  toggle() {
    this.element.classList.toggle('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element;
  }

  toggle() {
    this.element.classList.toggle('Tabs__link-selected');
  }
}

class Tabs {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', (event) => {
      this.updateActive(event.target.dataset.tab);
      event.stopPropagation();
    });

    this.links = element.querySelectorAll('.Tabs__link');
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link);
    });

    this.tabItems = element.querySelectorAll('.Tabs__item');
    this.tabItems = Array.from(this.tabItems).map((item) => {
      return new TabItem(item);
    });

    this.activeLink = this.links[0];
    this.activeItem = this.tabItems[0];
    this.init();
  }

  init() {
    this.links[0].element.classList.add('Tabs__link-selected');
    this.tabItems[0].element.classList.add('Tabs__item-selected');
  }

  updateActive(index) {
    if(index){
      this.activeLink.toggle();
      this.links[index-1].toggle();
      this.activeLink = this.links[index-1];
      this.activeItem.toggle();
      this.tabItems[index-1].toggle();
      this.activeItem = this.tabItems[index-1];
    }
  }
}

let tabs = document.querySelectorAll('.Tabs');
Array.from(tabs).forEach((tabs) => new Tabs(tabs));
