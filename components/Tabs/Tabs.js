// to test file:///C:/Users/Eileen/DOM-JavaScript-mini/index.html
// file includes DOM-JavaScript-Mini, refactoring with parent  

const getTab = (data) => {  
	return document.querySelector(`.Tabs__item[data-tab="${data}"]`);
};

const TabItemProto = (element) => ({
    select: () => {
    element.classList.add("Tabs__item-selected");
  },

  deselect: () => {
    element.classList.remove("Tabs__item-selected");  
  },
});

const TabItem = element => Object.create(TabItemProto(element));

const TabLinkProto = (element) => ({
  element,

  select: function() {
    element.classList.add("Tabs__link-selected");
    this.tabItem.select();
  },

  deselect: function() {
    element.classList.remove("Tabs__link-selected");
    this.tabItem.deselect();
  },

  tabItem: TabItem(getTab(element.dataset.tab)),
});

const TabLink = element => Object.create(TabLinkProto(element));

const TabsProto = (element) => ({
  element,

  tabs: this,

  updateActive: function(newActive) {
    this.links.forEach((link) => {
      if (link.element === newActive.element) {
        link.select();
      } else {
        link.deselect();
      }
   
		});

  },

  links: Array.from(element.querySelectorAll(".Tabs__link")).map((link) => {
    const linkObj = TabLink(link);
    linkObj.element.addEventListener('click', () => {
      tabs.updateActive(linkObj);
    });

    return linkObj;
 }),

  init: function() {
    this.links[0].select();
  },

});

const Tabs = element => Object.create(TabsProto(element));

let tabs = Tabs(document.querySelector(".Tabs"));
tabs.init();

/* class TabItem {
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
	constructor (element) {
		this.element = element;
		this.tabItem = this.getTab(this.element.dataset.tab); //tab can still be used because it is part of dataset property (which is an object)
		this.tabItem = new TabItem(this.tabItem);
};
   getTab(data) {
      // use the tab item classname and the data attribute to select the proper tab
     return this.element.parentNode.parentNode.querySelector(`.Tabs__item[data-tab="${data}"]`); // parentNode is being called twice because in the original function
		                                                          // this.element referred to the tabs element on the DOM (div that contains a list of all tab link elements)
		                                                         // in the refactoring here it refers to the tabLink element  
    }*/

/*class TabLink {   // DOM-JavaScript-Mini
  constructor(element, parent) {
    this.element = element;  // attach dom element to object
		this.tabs = parent;     //  attach parent to object
		this.tabItem = parent.getTab(this.element.dataset.tab); // assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem);  // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
		this.element.addEventListener('click', () => {
    this.tabs.updateActive(this);
    this.select();
   });
 }; */

/*  select() {
    // select this link
    // select the associated tab
		this.element.classList.add('Tabs__link-selected');
		this.tabItem.select();
  }

  deselect() {
    // deselect this link
    // deselect the associated tab
		 this.element.classList.remove('Tabs__link-selected');
		 this.tabItem.deselect();
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
		  const linkObj = new TabLink(link, this);
			linkObj.element.addEventListener('click', () => {
			this.updateActive(linkObj);
			linkObj.select();
		 });
      return linkObj;
    });
    this.activeLink = this.links[0];
    this.init();
  } */
	
	/*class Tabs {   // DOM-JavaScript-Mini
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.init();
  }*/

 /* init() {
    this.updateActive(this.links[0]);
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
  } */

/*  getTab(data) {  // DOM-JavaScript-Mini
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  } */  

//} 

//let tabs = document.querySelectorAll(".Tabs");
//tabs = Array.from(tabs).map(tabs => new Tabs(tabs)); 
