
// // My Original Code
// class TabItem {
//   constructor(element) {
//     // attach dom element to object. Example in Tabs class
//     this.element = element;
//   }

//   select() {
//     // should use 
//     this.element.classList.add('Tabs__item-selected');
//   }

//   deselect() {
//     // should use classList
//     this.element.classList.remove('Tabs__item-selected');
//   }
// }

// class TabLink {
//   constructor(element, parent) {
//     this.element = element;// attach dom element to object
//     this.tabs = parent;// attach parent to object
//     this.tabItem = this.tabs.getTab(element);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
//     this.tabItem = new TabItem(this.tabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
//     this.element.addEventListener('click', () => {
//       this.tabs.updateActive(this);
//     });
//   };

//   select() {
//     // select this link
//     // select the associated tab
//     this.element.classList.add('Tabs__link-selected');
//     this.tabItem.select();
//   }

//   deselect() {
//     // deselect this link
//     // deselect the associated tab
//     this.element.classList.remove('Tabs__link-selected');
//     this.tabItem.deselect();
//   }
// }

// class Tabs {
//   constructor(element) {
//     this.element = element;// attaches the dom node to the object as "this.element"
//     this.links = element.querySelectorAll('.Tabs__link');
//     this.links = Array.from(this.links).map((link) => {
//       return new TabLink(link, this);
//     });
//     this.init();
//   }

//   init() {
//     // select the first link and tab upon ititialization
//     this.updateActive(this.links[0]);    
//   }

//   updateActive(newActive) {
//     // deselect the old active link
//     // assign the new active link
//     this.links.forEach((val) => {
//       if (val !== newActive) val.deselect();
//     });
//     this.activeLink = newActive;
//     this.activeLink.select();
//   }

//   getTab(element) {
//     // use the tab item classname and the data attribute to select the proper tab
//     return Array.from(this.element.querySelectorAll('.Tabs__item')).find(val => val.dataset.tab === element.dataset.tab);
//   }

// }

// let tabs = document.querySelectorAll('.Tabs');
// Array.from(tabs).map(tabs => new Tabs(tabs));


// // Model Code
// class TabItem {
//   constructor(element) {
//      this.element = element;
//    }

//    select() {
//      this.element.classList.add('Tabs__item-selected')
//    }

//    deselect() {
//      this.element.classList.remove('Tabs__item-selected')
//    }
// }

// class TabLink {
//  constructor(element, parent) {
//    this.element = element; // attach dom element to object
//    this.tabs = parent; // attach parent to object
//    this.tabItem = parent.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
//    // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
//    this.tabItem = new TabItem(this.tabItem)
//    this.element.addEventListener('click', () => {
//      this.tabs.updateActive(this);
//      this.select();
//    });
//  };

//  select() {
//    // select this link
//    this.element.classList.add('Tabs__link-selected')
//    // select the associated tab
//    this.tabItem.select()
//  }

//  deselect() {
//    // deselect this link
//    this.element.classList.remove('Tabs__link-selected')
//    // deselect the associated tab
//    this.tabItem.deselect()
//  }
// }

// class Tabs {
//  constructor(element) {
//    this.element = element;// attaches the dom node to the object as "this.element"
//    this.links = element.querySelectorAll(".Tabs__link");
//    this.links = Array.from(this.links).map((link) => {
//      return new TabLink(link, this);
//    });
//    this.activeLink = this.links[0];
//    this.init();
//  }

//  init() {
//    // select the first link and tab upon ititialization
//    this.activeLink.select()

//  }

//  updateActive(newActive) {
//    // deselect the old active link
//    this.activeLink.deselect()
//    // assign the new active link
//    this.activeLink = newActive
//  }

//  getTab(data) {
//    // use the tab item classname and the data attribute to select the proper tab
//    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`)
//  }

// }

// let tabs = document.querySelectorAll(".Tabs");
// tabs = Array.from(tabs).map(tabs => new Tabs(tabs));


//My Refactor
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
