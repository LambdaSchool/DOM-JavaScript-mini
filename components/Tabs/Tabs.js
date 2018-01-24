class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', (event) => {
      event.tabData = this.element.dataset.tab;
    });
  };

  select() {
    this.element.classList.add("Tabs__link-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");
  }
}

class Tabs {
  constructor(element) {
    this.element = element;

    // Attach links to data-tab
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});

    // Attach items to data-tab
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});

    // addEvenListener for 'click'
    this.element.addEventListener('click', (event) => {
      if (event.tabData) {
       this.updateActive(event.tabData);
       event.stopPropagation(); 
      }
    })
    // Initializes the selected Tab
    this.activeData = element.querySelector(".Tabs__default");
    this.activeData = this.activeData ? this.activeData.dataset.tab : null;
    this.updateActive(this.activeData);
  }

  updateActive(newActive) {
    if (newActive === null) return;
    if (this.activeData) {
      // deselect previously selected tab
      this.links[this.activeData].deselect();
      this.items[this.activeData].deselect();
    }
    // Get new Tab
    this.links[newActive].select();
    this.items[newActive].select();
    this.activeData = newActive;
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
