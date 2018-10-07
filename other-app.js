let cart = [];

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


// initiate localStorageCart

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

///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
