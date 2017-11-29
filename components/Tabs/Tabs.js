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
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = new TabItem(this.tabs.getTab(this.element.dataset.tab));// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    // new TabItem(reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  }

  select() {
    // select this link
    // select the associated tab
    this.element.classList.add('Tabs__link-selected');
    this.tabItem.select();
  }

  deselect() {
    this.element.classList.remove('Tabs__link-selected');
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
    // select the first link and tab upon ititialization
    this.activeLink.element.click();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
    this.activeLink.deselect();
    this.activeLink = newActive;
  }
  
  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector('.Tabs__item[data-tab="' + data + '"]');  
  } 
};

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));




/* over coded answer above!!! */
/*
 // short code answer
  document.querySelectorAll('.List__item').forEach(ele => {
    ele.addEventListener('click', function(event){
      event.preventDefault();
      const active = this.getAttribute('data-tab');
      document.querySelectorAll('.Tabs__link-selected').forEach(e => {if (e.classList.contains('Tabs__link-selected')) e.classList.remove('Tabs__link-selected');});
      document.querySelectorAll('.Tabs__item-selected').forEach(e => {if (e.classList.contains('Tabs__item-selected')) e.classList.remove('Tabs__item-selected');});
      this.classList.add('Tabs__link-selected');
      document.querySelectorAll('.Tabs__item').forEach(e => {
        if(active === e.getAttribute('data-tab')) {
          e.classList.add('Tabs__item-selected');
        }
      });
    });
  });
  document.querySelector('.List__item').click();
  
*/
