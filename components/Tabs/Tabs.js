class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    const item = document.querySelector('.List .List__item'); // `.querySelector` selects the class `.List` wich holds another class, `.List__item` which is the class attached to the 3 buttons (tabs) that we want. We are attaching this result to the `const item` so we can easily use it in the line below.
    this.item.select();
  }

  deselect() {
    // should use classList
    this.element.classList.remove('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    // select this link
    this.element.classList.add('Tabs__link-selected');
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
    this.links = this.element.querySelectorAll(".Tabs__link"); // `.querySelectorAll` selects all ocurrences of the `.Tabs__link` class. Which means all ocurrences of the 3 buttons we want. 
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.active = this.links[0];
    this.links[0];
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect();
    // assign the new active link
    this.activeLink = newActive;
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector('.Tabs__item[data-tab="${data}"]'); // `.querySelector` selects the `.Tabs__item` class. Which is a box of text that will appear under each of our 3 buttons. I still don't understand what '[data-tab="${data}"]' means.
  }

}

let tabs = document.querySelectorAll(".Tabs"); // `.querySelectorAll` selects all occurences of the `.Tabs` class. There is only one occurence of that class. That class holds the 3 buttons we want.
tabs = Array.from(tabs).map(tabs => new Tabs(tabs)); //We are grabbing the `tabs` variable we created on the previous line and converting it into an array using `Array.from`.Then, we are using `.map` to ???????????????????????????????????????????????
