const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

//format mainEL
const mainEl = document.querySelector('main');
mainEl.style.setProperty('background-color', 'var(--main-bg)');
mainEl.innerHTML = '<h1>SEI Rocks!</h1>'
mainEl.classList.add('flex-ctr')

//format topMenuEL
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = '100%';
topMenuEl.style.setProperty('background-color', 'var(--top-menu-bg)');
topMenuEl.classList.add('flex-around')

//build top menu from links array
for(let menuLink of menuLinks) {
  let liEl = document.createElement('a');
  liEl.setAttribute ('href', menuLink.href);
  liEl.textContent = menuLink.text;
  topMenuEl.appendChild(liEl);
}

//format subMenuEl
const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.setProperty('background-color', 'var(--sub-menu-bg)');
subMenuEl.classList.add('flex-around');
subMenuEl.style.setProperty('position', 'absolute');
subMenuEl.style.setProperty('top', '0');

let topMenuLinks = document.querySelectorAll('a');
let showingSubMenu = false;

topMenuEl.addEventListener('click', function(evt){
  evt.preventDefault();
  //bail if the user somehow clicked something we didn't expect
  if (evt.target.tagName != 'A') {
    return;
  }

// reset menu when About is clicked and update mainEL
if (evt.target.innerText.toLowerCase() === 'about') {
  mainEl.innerHTML = `<h1>${evt.target.innerText}</h1>`
  removeActiveClass(topMenuLinks);  
  subMenuEl.style.setProperty('top', '0');
  return;
}

  // reset menu if active menu item is clicked 
  if (evt.target.classList.contains('active')) {
  // evt.target.classList.remove('active'); // **replacing 'remove active from target' and using remove all function instead. Fixes bug where active remains on top menu when About is clicked.**
    removeActiveClass(topMenuLinks);  
    showingSubMenu = false;
    subMenuEl.style.setProperty('top', '0');
    return;
  } 
//remove 'class = active' from all menu items
  removeActiveClass(topMenuLinks);
 
//set clicked menu item to 'active'
  evt.target.classList.add('active');
  
  // if (evt.target.classList.contains('sublinks')) {
  for(let menuLink of menuLinks) {
    if (evt.target.textContent === menuLink.text && menuLink.subLinks) {
    showingSubMenu = true;
      buildSubMenu(menuLink.subLinks)
      subMenuEl.style.setProperty('top', '100%');
    } else if (showingSubMenu = false){
      // no submenu
      subMenuEl.style.setProperty('top', '0');
    }
  }  
})

subMenuEl.addEventListener('click', function(evt){
  evt.preventDefault();
  subMenuEl.style.setProperty('top', '0');
  removeActiveClass(topMenuLinks);
  mainEl.innerHTML = `<h1>${evt.target.innerText}</h1>`
});

function buildSubMenu (linkArr) {
  //clear subMenu
  subMenuEl.innerHTML = '';
  //build submenu
  for(let link of linkArr) {
  let liEl = document.createElement('a');
  liEl.setAttribute ('href', link.href);
  liEl.textContent = link.text;
  subMenuEl.appendChild(liEl);
  }
};
  
//remove class = active from all menu items
function removeActiveClass(menuLinks) { 
  for (let menuLink of menuLinks) {
      menuLink.classList.remove('active');
    }
}