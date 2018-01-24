
class TabItem {
  constructor(element) {
	this.element = element;
    // attach dom element to object. Example in Tabs class
  }

  select() {
	if (!this.element.classList.contains("Tabs__item-selected")) {
		this.element.classList.add("Tabs__item-selected");		
	}
    // should use classList
  }

  deselect() {
  	if (this.element.classList.contains("Tabs__item-selected")) {
		this.element.classList.remove("Tabs__item-selected");		
	}
    // should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
	console.log(this.tabItem);
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
	if (!this.element.classList.contains("Tabs__link-selected")) {
		this.element.classList.add("Tabs__link-selected");
	}
	this.tabItem.select();
    // select this link
    // select the associated tab
  }

  deselect() {
    if (this.element.classList.contains("Tabs__link-selected")) {
		this.element.classList.remove("Tabs__link-selected");		
	}
	this.tabItem.deselect();
    // deselect this link
    // deselect the associated tab
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
	this.activeLink.select();
    // select the first link and tab upon initialization
  }

  updateActive(newActive) {
	this.activeLink.deselect();
	this.activeLink = newActive;
    // deselect the old active link
    // assign the new active link
  }

  getTab(data) { // data = 1 || 2 || 3
	return this.element.querySelector(`.Tabs__item[data-tab='${data}']`)
	
	/* leaving in my old solution for posterity
	for (let i = 0; i < this.links.length; i++) {
		if (this.links[i].dataset.tab === data) {
			let allTabItems = this.element.querySelectorAll(".Tabs__item");
			for (let j = 0; j < allTabItems.length; j++) {
				if (allTabItems[j].dataset.tab === data) return allTabItems[j]
			}
		}
	}*/
	
    // use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
