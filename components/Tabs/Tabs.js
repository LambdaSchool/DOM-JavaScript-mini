const TabItemProto = (element) => {
  const select = () => {
    this.element.classList.add("Tabs__item-selected");
  }

  const deselect = () => {
    this.element.classList.remove("Tabs__item-selected");  
  }

  this.element = element;
  return this;
}

const TabItem = element => Object.create(TabItemProto(element));

const TabLinkProto = (element) => {
  this.select = () => {
    this.element.classList.add("Tabs__link-selected");
    this.tabItem.select();
  }

  this.deselect = () => {
    this.element.classList.remove("Tabs__link-selected");
    this.tabItem.deselect();
  }

  this.getTab = (data) => {
    return this.element.parentNode.parentNode.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

  this.element = element;// attach dom element to object
  this.tabItem = this.getTab(element.dataset.tab);
  // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
  this.tabItem = TabItem(this.tabItem);
  this.activeLink = this.links[0];
  return this;
}

const TabLink = element => Object.create(TabLinkProto(element));

const TabsProto = (element) => {
  this.updateActive = (newActive) => {
    this.activeLink.deselect();
    this.activeLink = newActive;
  }

  this.init = () => {
    this.select(this.activeLink);
  }

  this.element = element;// attaches the dom node to the object as "this.element"
  this.links = element.querySelectorAll(".Tabs__link");
  this.links = Array.from(this.links).map((link) => {
    const linkObj = TabLink(link, this);
    linkObj.element.addEventListener('click', () => {
      this.updateActive(linkObj);
    });
    return linkObj;
  });
  this.init();
  return this;
}

const Tabs = (element) => Object.create(TabsProto(element));

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => Tabs(tabs));
