class TabItem {
  constructor(element, classChildSelector = "Tabs__item-selected") {this.element = element; this.classSelector = classChildSelector}
  select() {this.element.classList.add(this.classSelector)}
  deselect() {this.element.classList.remove(this.classSelector)}
}

class TabLink {
  constructor(element, parent, classSelector = "Tabs__link-selected") {
    this.element = element;
    this.tabs = parent;
    this.classSelector = classSelector;
    this.tabItem = new TabItem(this.tabs.getTab(this.element.dataset.tab));
    this.element.addEventListener('click', () => {this.tabs.updateActive(this); this.select()});
  }
  select() {this.tabItem.select(); this.element.classList.add(this.classSelector)}
  deselect() {this.tabItem.deselect(); this.element.classList.remove(this.classSelector)}
}

class Tabs {
  constructor(element) {
    this.element = element;
    this.links = Array.from(element.querySelectorAll(".Tabs__link")).map((link) => new TabLink(link, this));
    this.activeLink = this.links[0];
    this.init();
  }
  updateActive(newActive) {
    this.activeLink.deselect();
    this.activeLink = newActive;
  }
  getTab(data) {return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`)}
  init() {this.activeLink.select()}
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));

