// Menu data structure
// var menuLinks = [
//   {text: 'about', href: '/about'},
//   {text: 'catalog', href: '/catalog'},
//   {text: 'orders', href: '/orders'},
//   {text: 'account', href: '/account'},
// ];

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

const mainEl = document.querySelector('main');

mainEl.style.setProperty('background-color', 'var(--main-bg)');
mainEl.innerHTML = '<h1>SEI Rocks!</h1>'
mainEl.setAttribute('class','flex-ctr')

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = '100%';
topMenuEl.style.setProperty('background-color', 'var(--top-menu-bg)');
topMenuEl.setAttribute('class','flex-around')

for(let menuLink of menuLinks) {
  let liEl = document.createElement('a');
  liEl.setAttribute ('href', menuLink.href);
  liEl.textContent = menuLink.text;
  topMenuEl.appendChild(liEl);
}
let topMenuLinks = document.querySelectorAll('a');
let showingSubMenu = false;


const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.setProperty('background-color', 'var(--sub-menu-bg)');
subMenuEl.setAttribute('class', 'flex-around');
subMenuEl.style.setProperty('position', 'absolute');
subMenuEl.style.setProperty('top', '0');

topMenuEl.addEventListener('click', function(evt){
  evt.preventDefault();
   
  if (evt.target.tagName != 'A') {
    return;
  }
  if (evt.target.classList.contains('active')) {
    // console.log("here - class = active")
    evt.target.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.setProperty('top', '0');
    for (let menuLink of topMenuLinks) {
      menuLink.classList.remove('active');
    }
    // console.log("here - return")
    return;
  } 
  // console.log("here - non-active")
  console.log(evt.target)
  evt.target.setAttribute('class','active'); //THis isn't working
})