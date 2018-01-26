let tabs = document.querySelectorAll(".Tabs");
// factory function
const Tabs = function (element) {
   // retrieve links and items node list
   const links = element.querySelectorAll('.Tabs__link');
   const items = element.querySelectorAll('.Tabs__item');

   // make first link and item active on page load
   links[0].classList.add('Tabs__link-selected');
   items[0].classList.add('Tabs__item-selected');

   // add click event to parent node element
   element.addEventListener('click', (event) => {
      // on click event, update the active link and item
      tabs.updateActive(event.target.dataset.tab);
      event.stopPropagation();
   });

   // return tabs object
   return {
   // object properties
      element: element,
      links: links,
      items: items,
      activeLink: links[0],
      activeItem: items[0],

      // handle updating the active link and item
      updateActive: (index) => {
         if(index){
            // remove class from active link and item
            tabs.activeLink.classList.remove('Tabs__link-selected');
            tabs.activeItem.classList.remove('Tabs__item-selected');

            // add class to active link and item
            tabs.links[index-1].classList.add('Tabs__link-selected');
            tabs.items[index-1].classList.add('Tabs__item-selected');

            // re-assign active link and item
            tabs.activeLink = tabs.links[index-1];
            tabs.activeItem = tabs.items[index-1];
         }
      }
   }
}

// create tabs object from parent node
tabs = Tabs(tabs[0]);