const yourCartLink = document.querySelectorAll('.your-cart-link');
const totalCost = document.querySelector('#totalCost');
//Select div to input new code
const tableCart = document.querySelector('#tableCart');
//find the array object passed as a string in the URL and first decode ''%20's and then convert it from JSON to JS object
const cart = JSON.parse(localStorage.localStorageCart);

// initialise price values on first load
updateLocalStorageCart(cart);

// update local Storage when quantities are updated.
function updateLocalStorageCart(cart) {
  // update cart prices based on quantities
  for(i = 0; i < cart.length; i += 1) {
    cart[i].price = parseFloat(cart[i].unitPrice * cart[i].quantity).toFixed(2);
  }
  localStorage.setItem('localStorageCart', JSON.stringify(cart));
}

//update the total cost every time an element is added/removed.
function totalCostCalc (cart) {
  let buildingCost = 0;
  console.log('outer');
  for(let i = 0; i < cart.length; i +=1 ) {
    buildingCost = (parseFloat(buildingCost) + parseFloat(cart[i].price));
    console.log(buildingCost);

  }
  totalCost.innerHTML = parseFloat(buildingCost).toFixed(2);
}
//For every object in the cart array: Create the tr element to be added to the table div
for(let i = 0; i < cart.length; i += 1) {
  let tableCartElement = document.createElement('tr');
  //concat the element
  tableCartElement.innerHTML += "<th scope='row'>" + cart[i].name + "</th><td>" + cart[i].size +
  "</td><td><input type='text' aria-label='quantity' class='cartQuantityInput' value=" + cart[i].quantity + "></td><td></td><td class='tableRowCost'>" + cart[i].price +
  "</td><td><button type='button' class='removeProductButton btn btn-danger btn-sm float-right'>Remove</button></td>";
  //append new element to existing table DIV
  tableCart.insertBefore(tableCartElement, tableCart.lastElementChild.previousElementSibling);
  //update the total cost every time an element is added
  totalCostCalc(cart);
  console.log(i);
}
//get all the remove buttons.
const removeProductButtons = document.querySelectorAll(".removeProductButton");
//display the cart icon
cartNavIcon.style = "display: block";
cartNavIcon.innerHTML = "Cart(" + cart.length + ")";
//when a remove button is clicked. remove the row from the table and from the array object.
for(let i = 0; i < removeProductButtons.length; i += 1 ) {
  removeProductButtons[i].addEventListener('click', (event) => {
    const productRow = event.target.parentNode.parentNode;
    tableCart.removeChild(productRow);
    //remove the matching name of product from the cart array by finding the index and comparing to name of table element.
    //compares selected row with the cart objects matching both NAME and PRICE so that when there are duplicate product
    //names in the cart, the correct one is removed from the cart array.
    cart.splice(cart.findIndex(i => i.name === event.target.parentNode.parentNode.firstElementChild.innerHTML && i.price === event.target.parentNode.parentNode.lastElementChild.previousElementSibling.innerHTML),1);
    localStorage.setItem('localStorageCart', JSON.stringify(cart));
    //adjust the cart icon to display accurate cart array object length
    cartNavIcon.innerHTML = "Cart(" + cart.length + ")";
    //Display a message if the cart is empty
    if(cart.length === 0) {
      const message = document.createElement('tr');
      message.innerHTML = "<td colspan='5'>Your cart is empty! Please go to<a href='ourcakes.html'> Our Cakes </a>and choose some cakes to add to your cart.</td>";
      tableCart.insertBefore(message, tableCart.lastElementChild.previousElementSibling);
    }
    //update the total cost every time an element is removed
    totalCostCalc(cart);
  });

}

//UPDATE QUANTITIES
const updateQuantityButton = document.querySelector('.updateQuantityButton');
const cartQuantityInput = document.querySelectorAll('.cartQuantityInput');

updateQuantityButton.addEventListener('click', () => {
  // Adjust the quantity of cart items
  for(let i = 0; i < cartQuantityInput.length; i += 1) {
    const newQuantity = cartQuantityInput[i].value;
    const oldQuantity = cart[i].quantity;
    if(newQuantity !== oldQuantity) {
      cart[i].quantity = newQuantity;
    }
  }
  updateLocalStorageCart(cart);
  window.href = location.reload();
});
