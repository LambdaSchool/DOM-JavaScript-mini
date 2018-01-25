
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
    this.clElement = this.element.classList;
  }

  select() {
    // should use classList
    this.clElement.add("Tabs__item-selected");
  }

  deselect() {
    // should use classList
    this.clElement.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    // assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.getContentTab(this.tabs, element)); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
    
  };

  select() {
    // select this link
    // select the associated tab
    this.element.className = "List__item Tabs__link Tabs__link-selected";
    this.tabItem.select();
  }

  deselect() {
    // deselect this link
    // deselect the associated tab
    this.element.className = "List__item Tabs__link";
    this.tabItem.deselect();
  }
  
  getContentTab(tabs, element) {
    for (let i = 0; i <= tabs.contentTabs.length; i++) {
          if(typeof tabs.contentTabs[i].dataset !== 'undefined')
              if(tabs.contentTabs[i].dataset.tab === element.dataset.tab) 
                  return this.tabs.contentTabs[i];
    }
    return false;
  }

}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.contentTabs = element.querySelectorAll(".Tabs__item");
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
    this.activeLink.deselect();
    this.activeLink = newActive;
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
