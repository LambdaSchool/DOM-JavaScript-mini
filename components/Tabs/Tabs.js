const getTab = (data) => {
  return document.querySelector(`.Tabs__item[data-tab="${data}"]`);
};

const TabItemProto = (element) => ({
  element,

  select: function() {
    element.classList.add("Tabs__item-selected");
  },

  deselect: function() {
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

  links: Array.from(element.querySelectorAll(".Tabs__link")).map(function(link) {
    const linkObj = TabLink(link);
    linkObj.element.addEventListener('click', function() {
      tabs.updateActive(linkObj);
    });
    return linkObj;
  }),

  init: function() {
    this.links[0].select();
  },
});

const Tabs = (element) => Object.create(TabsProto(element));

let tabs = Tabs(document.querySelector(".Tabs"));
tabs.init();
