const cardDeck = document.querySelector('.card-deck');
const bin = document.querySelector('#bin');
const list = document.querySelectorAll('#bin h5');
const cardBodies = bin.querySelectorAll('.card-body');
const priceTag = cardDeck.querySelectorAll('a.btn-secondary');
const modalSizeSelector = document.querySelector('#modalSizeSelector');
const modalSizes = modalSizeSelector.children;
let modalCost = document.querySelector('#modalCost');
let modalTitle = document.querySelector('#modalTitle');
const orderNowButtons = bin.querySelectorAll('a.btn-info.float-right');
const continueShoppingButton = document.querySelector('#continueShoppingButton');
const closeModalButton = document.querySelector('#closeModalButton');
const modalQuantitySelector = document.querySelector('#modalQuantitySelector');
const orderModal = document.querySelector('#orderModal');
const addToCartButton = document.querySelector('#addToCartButton');
let cart = [];
let cakes = [];
const sizeErrorMessage = document.querySelector('#sizeErrorMessage');
const cartPopUp = document.querySelector('#cartPopUp');
const navbarNav = document.querySelector('#navbarNav');
const cartNavIcon = document.querySelector('#cartNavIcon');
const yourCartLink = document.querySelectorAll('.your-cart-link');

//MODAL: Input correct Modal product title based on which 'order now'
//       button is clicked.
for (let i = 0; i < cardBodies.length; i += 1) {
    orderNowButtons[i].addEventListener('click', function(event) {
            modalTitle.innerHTML = list[i].innerHTML;
    });
}

//MODAL: adjust price based on selected sizes
orderModal.addEventListener('change', () => {
  const quantity = parseFloat(modalQuantitySelector.options[modalQuantitySelector.selectedIndex].text).toFixed(2);
  for (let i = 0; i < cardBodies.length; i += 1) {
    if(list[i].innerHTML === modalTitle.innerHTML) {
      if (modalSizeSelector.options[modalSizeSelector.selectedIndex].text === "Small") {
        modalCost.innerHTML = parseFloat(cakes[i].price * quantity).toFixed(2);
      } else if (modalSizeSelector.options[modalSizeSelector.selectedIndex].text === "Medium") {
        modalCost.innerHTML = parseFloat(cakes[i].mediumPrice * quantity).toFixed(2);
      } else if (modalSizeSelector.options[modalSizeSelector.selectedIndex].text === "Large") {
        modalCost.innerHTML = parseFloat(cakes[i].largePrice * quantity).toFixed(2);
      } else if (modalSizeSelector.options[modalSizeSelector.selectedIndex].text === "Extra Large") {
        modalCost.innerHTML = parseFloat(cakes[i].extraLargePrice * quantity).toFixed(2);
      } else if (modalSizeSelector.options[modalSizeSelector.selectedIndex].text === "Gigantic") {
        modalCost.innerHTML = parseFloat(cakes[i].giganticPrice * quantity).toFixed(2);
      }
    }
  }
});

//MODAL: Reset Price and Select option on click of 'continue shopping'
continueShoppingButton.addEventListener('click', () => {
  modalCost.innerHTML = "0.00";
  modalSizeSelector.selectedIndex = "Select Price";
});

closeModalButton.addEventListener('click', () => {
  modalCost.innerHTML = "0.00";
  modalSizeSelector.selectedIndex = "Select Price";
});

//MODAL: Add items to cart array object
addToCartButton.addEventListener('click', () => {
  //Check if a size has been selected.
  if(modalSizeSelector.options[modalSizeSelector.selectedIndex].text !== "Select Size") {
    //Remove previous error messages if the error has been rectified by the user
      if(modalSizeSelector.style.border = "red 2px solid") {
        modalSizeSelector.style.border = "";
        sizeErrorMessage.style = "display: none";
      }
      //add the order details to the cart array object
      let cartElement = {};
      cartElement.name = modalTitle.innerHTML
      cartElement.size = modalSizeSelector.options[modalSizeSelector.selectedIndex].text;
      cartElement.quantity = modalQuantitySelector.options[modalQuantitySelector.selectedIndex].text;
      cartElement.price = parseFloat(modalCost.innerHTML).toFixed(2);
      cart = addToLocalStorageCart(cartElement);
      $("#cartPopUp").fadeIn('slow').delay('5000').fadeOut('slow');
      //update the cart icon in navbar
      cartNavIcon.style = "display: block";
      cartNavIcon.innerHTML = "Cart(" + cart.length + ")";

    //if a size isnt selected. display error message.
  } else {
    modalSizeSelector.style.border = "red solid";
    sizeErrorMessage.style = "display: block; color: red";
  }
});
///////////////////////////////////////////////////////////////////////////
/////    LOCAL STORAGE FUNCTIONS   ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//make sure the browser supports localStorage
function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
    return false;
  }
}

//Fetch the localStorageCart from localStorage
function getLocalStorageCart() {
  const localStorageCart = localStorage.getItem('localStorageCart');
  if(localStorageCart) {
    return JSON.parse(localStorageCart);
  } else {
    return [];
  }
}

//save an entry to localStorage when the add to cart button is clicked
function addToLocalStorageCart(str) {
  const localStorageCart = getLocalStorageCart();
  // str = "<li>" + str + "</li>";
  localStorageCart.push(str);
  localStorage.setItem('localStorageCart', JSON.stringify(localStorageCart));
  return localStorageCart;
}

window.onload = function () {
  if(supportsLocalStorage) {
    cart = getLocalStorageCart();
    //Create a cart icon in the Navbar if there are items added to cart.
    if(cart.length > 0) {
      cartNavIcon.style = "display: block";
      cartNavIcon.innerHTML = "Cart(" + cart.length + ")";
    }
  } else {
    console.log('error. browser does not support local storage');
  }
}

//add each cake property to an object and attach object to cakes array.
for (i = 0; i < list.length; i +=1) {
  let cakesElement = {};
  cakesElement.name = list[i].innerHTML;
  cakesElement.price = parseFloat(priceTag[i].innerHTML).toFixed(2);
  cakesElement.mediumPrice = parseFloat(priceTag[i].innerHTML * 2).toFixed(2),
  cakesElement.largePrice = parseFloat(priceTag[i].innerHTML * 2.9).toFixed(2),
  cakesElement.extraLargePrice = parseFloat(priceTag[i].innerHTML * 3.8).toFixed(2),
  cakesElement.giganticPrice = parseFloat(priceTag[i].innerHTML * 7.7).toFixed(2)
  cakes.push(cakesElement);
}
