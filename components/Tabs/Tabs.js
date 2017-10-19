
class TabItem {
  constructor(element) {
    this.element = element; // attach dom element to object. Example in Tabs class
  }

  select() {
    this.element.classList.add("Tabs__item-selected"); // updates the attribute on the element - could we use toggle here?
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected") // removes the attribute from the element - this would be the inverse of the above with the toggle method? 
  }
}

class TabLink { // creating a TabLink class object that we can manipulate
  constructor(element, parent) { // constructor provides the instructions to build the object
    this.element = element; // sets this instance of the TabLink's element to the one that was passed in
    this.tabs = parent; // pulls this instance of tab down from the parent node
    this.tabItem = this.tabs.getTab(this.element.dataset.tab); // sets this instance of tabItem using the tabs class function getTab, found on the passed in element, using the built-in method dataset, which accesses the property found in the tab
    this.tabItem = new TabItem(this.tabItem, this); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => { // adds a click event listener
      this.tabs.updateActive(this); // which updates the activeLink by way of tabs' passed in function
      this.select(); // selects the now active link
    });
  };

  select() {
    this.element.classList.add("Tabs__link-selected"); // pushes the attribute selected to the Tabs__link class
    this.tabItem.select(); // utilizes the select method from tabItem
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected"); // pops the selected attribute from the Tabs__link class
    this.tabItem.deselect(); // utilizes the deselect method from tabItem
  }
}

class Tabs { // creating a tabs class object that we can play with
  constructor(element) { // constructor provides the instructions to build the object
    this.element = element;// sets this instance of Tab's element, to the passed in element
    this.links = element.querySelectorAll(".Tabs__link"); // sets this link to the link passed in by element
    this.links = Array.from(this.links).map((link) => { // maps the links to an actual array of objects, rather than an arrayLIKE object. The array can be manipulated, the arrayLIKE object cannot
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0]; // sets the active link to the link contained in the array at the first position
    this.init(); // pulls in the init (initialize) method
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select(); // uses the select method provided by activeLink
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect() // uses the deselect method proided by activeLink
    // assign the new active link
    this.activeLink = newActive; // changes the current activeLink to the newly selected item, so it can be further updated as we interact with the DOM
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`); // querySelector returns the first instance that matches or null if there are no matches found. the information being searched for is provided by the es6 string (search the Tabs__item nodes for a class of data-tab and an attribute of data, which was passed in as an argument)
  }

}

let tabs = document.querySelectorAll(".Tabs"); // sets tabs to the Tabs nodes so we don't need to search starting at the DOM node
tabs = Array.from(tabs).map(tabs => new Tabs(tabs)); // creates an array that we can manipulate from the nodes
