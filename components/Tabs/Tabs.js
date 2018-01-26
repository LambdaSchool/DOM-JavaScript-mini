
class TabItem {
  constructor(element) {
     this.element = element;
   }

  select() {
    this.element.classList.add('Tabs__item-selected')
  }

  deselect() {
    this.element.classList.remove('Tabs__item-selected')
  }
}

class TabLink {
  constructor(element) {
    this.element = element; // attach dom element to object
}

select() {
   // select this link
  this.element.classList.add('Tabs__link-selected')
}

deselect() {
  // deselect this link
  this.element.classList.remove('Tabs__link-selected')
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links);
    this.tabLinks = this.links.map(val => new TabLink(val));
    this.tabItems = this.links.map(val => new TabItem(document.querySelector(`.Tabs__item[data-tab="${val.dataset.tab}"]`)));
    this.links.forEach((val, index) => {
      val.addEventListener('click', () => {
        this.updateActive(event.srcElement.dataset.tab);
      });
    });
    this.activeLink = this.links[0];
    this.init();
 }

  init() {
    // select the first link and tab upon ititialization
    (this.tabLinks.find((val) => val.element.dataset.tab === this.activeLink.dataset.tab)).select();
    (this.tabItems.find((val) => val.element.dataset.tab === this.activeLink.dataset.tab)).select();

  }

  updateActive(event) {
    // deselect the old active link
    // assign the new active link
    (this.tabLinks.find((val) => val.element.dataset.tab === this.activeLink.dataset.tab)).deselect();
    (this.tabItems.find((val) => val.element.dataset.tab === this.activeLink.dataset.tab)).deselect();
    (this.tabLinks.find((val) => val.element.dataset.tab === event)).select();
    (this.tabItems.find((val) => val.element.dataset.tab === event)).select();
    this.activeLink = this.links.find((val) => val.dataset.tab === event);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
