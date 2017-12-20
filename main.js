var items = document.querySelectorAll('.List__item');
console.log(items)

items.forEach((item) => {
  item.addEventListener('click', function() {
    item.classList.add('Tabs__item-selected')
  })
})
