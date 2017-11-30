
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    return this.element.classList.add("Tabs__item--selected");
  }

  deselect() {
    // should use classList
    return this.element.classList.remove("Tabs__item--selected");
}
}
class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
    //this.tabs = parent;// attach parent to object
    //this.tabItem =  tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    //this.tabItem = new TabItem(this.TabItem);
    this.element.addEventListener('click', (event) => {
      event.tabData = this.element.dataset.tab;
    });
  };

  select() {
    // select this link
   // select the associated tab
    return this.element.classList.add('Tabs__link--selected');
    //this.tabItem.select();
  }

  deselect() {
    // deselect this link
    // deselect the associated tab
    return this.element.classList.remove('Tabs__link--selected');
    //this.tabItem.deselect();
  // return this.element.select().value =""; <---don't do this!
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.activeData = null;
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});
    this.element.addEventListener('click', event => {
      if (event.tabData) {
        //do proper deselecting and selecting of links and items
        this.updateActive(event.tabData);
        event.stopPropogation();
      }
    });
    //this.init();
  }

  init() {
    this.activeData = this.element.querySelector(".Tabs__link--default");
    this.activeData = this.activeData ? this.activeData.dataset.tab : this.links[0].dataset.tab;
    this.updateActive(this.activeData);
    // this.activeLink = this.links[0];
    // this.activeLink.select();

  }

  updateActive(newActive) {
    // deselect the old active link
    if (this.activeData === null) {
      this.links[this.activeData].deselect();
      this.items[this.activeData].deselect();
    }
    this.links[data].select();
    this.items[data].select();
    
    // assign the new active data 
    this.activeData = data;
  }

  // getTab(data) {
  //   // use the tab item classname and the data attribute to select the proper tab
  //   return this.element.querySelector(`.Tabs__item[data-tab='${data}']`);
  // }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
