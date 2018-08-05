const cardDeck = document.querySelector('.card-deck');
const priceTag = cardDeck.querySelectorAll('a.btn-secondary');
const search = document.getElementById('searchTerm');
const submitButton = document.querySelector('#submitSearch');
const list = document.querySelectorAll('#bin h5');
const clearButton = document.querySelector('#clear');
const navbarBrand = document.querySelector('.navbar-brand');
let cakes = [];
const modalSizeSelector = document.querySelector('#modalSizeSelector');
const modalSizes = modalSizeSelector.children;
const bin = document.querySelector('#bin');
const cardBodies = bin.querySelectorAll('.card-body');
let modalCost = document.querySelector('#modalCost');
let modalTitle = document.querySelector('#modalTitle');
const orderNowButtons = bin.querySelectorAll('a.btn-info.float-right');
const continueShoppingButton = document.querySelector('#continueShoppingButton');
const closeModalButton = document.querySelector('#closeModalButton');
const modalQuantitySelector = document.querySelector('#modalQuantitySelector');
const orderModal = document.querySelector('#orderModal');
const addToCartButton = document.querySelector('#addToCartButton');
let cart = [];

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

//Remove dollar sign for sorting purposes
function removeDollarSign(a) {
  let removeDollarSign = a.querySelector("span");
  if (removeDollarSign) {
    a.removeChild(removeDollarSign);
  }
}

//prepends dollar sign to price tags in ourcakes
function attachDollarSign(a) {
  let dollarSign = document.createElement('span');
  dollarSign.innerHTML = "$";
  a.insertBefore(dollarSign, a.firstChild);
}
//Call the function for all price tags
for (let i = 0; i < priceTag.length; i += 1 ) {
  attachDollarSign(priceTag[i]);
}

// Sort ourcake Divs A-Z
$('#alphBnt').on('click', function () {
 var alphabeticallyOrderedDivs = $('.col-sm-6').sort(function(a, b) {
       return String.prototype.localeCompare.call($(a).text().toLowerCase(), $(b).text().toLowerCase());
     });

 var cardDeck = $(".card-deck");
 cardDeck.detach().empty().append(alphabeticallyOrderedDivs);
 $('#bin').append(cardDeck);

});

// Sort ourcake Divs Z-A
$('#reverseAlphBnt').on('click', function () {
 var alphabeticallyOrderedDivs = $('.col-sm-6').sort(function(a, b) {
       return String.prototype.localeCompare.call($(b).text().toLowerCase(), $(a).text().toLowerCase());
     });

 var cardDeck = $(".card-deck");
 cardDeck.detach().empty().append(alphabeticallyOrderedDivs);
 $('#bin').append(cardDeck);

});

//Sort ourcake Divs price low - high
$('#priceAscend').on('click', function () {
  $('.card-deck').each(function(){
    //remove dollar sign for sorting purposes
    for (let i = 0; i < priceTag.length; i += 1 ) {
      removeDollarSign(priceTag[i]);
    }
    //sort
    $(this).html(
      $(this).find('.col-sm-6').sort(function(a, b) {
        let dsa = parseInt($(a).find('.btn-secondary').eq(0).text()),
            dsb = parseInt($(b).find('.btn-secondary').eq(0).text());
        return (dsa > dsb ? 1 : (dsa < dsb) ? -1 : 0);
      })
    );
    for (let i = 0; i < priceTag.length; i += 1 ) {
      attachDollarSign(priceTag[i]);
    }
  });
});

//Sort ourcake Divs price high - low
$('#priceDescend').on('click', function () {
  $('.card-deck').each(function(){
    //remove dollar sign for sorting purposes
    for (let i = 0; i < priceTag.length; i += 1 ) {
      removeDollarSign(priceTag[i]);
    }
    //sort
    $(this).html(
      $(this).find('.col-sm-6').sort(function(a, b) {
        let dsa = parseInt($(a).find('.btn-secondary').eq(0).text()),
            dsb = parseInt($(b).find('.btn-secondary').eq(0).text());
        return (dsa > dsb ? -1 : (dsa < dsb) ? 1 : 0);
      })
    );
    for (let i = 0; i < priceTag.length; i += 1 ) {
      attachDollarSign(priceTag[i]);
    }
  });
});

//Operate search bar function ON-PAGE
submitButton.addEventListener('click', () => {
  for (i = 0; i < list.length; i += 1) {
    let title = list[i].innerHTML;
    if ( title.toLowerCase().includes(search.value.toLowerCase()) ) {
      list[i].parentNode.parentNode.parentNode.style.display="block";
    } else {
      list[i].parentNode.parentNode.parentNode.style.display="none";
    }
  }
  search.value = "";
});

//Operate search bar function OFF-PAGE
const alternateSearchTerm = location.search.substr(location.search.indexOf("=")+1);
if (alternateSearchTerm) {
  for (i = 0; i < list.length; i += 1) {
    let title = list[i].innerHTML;
    if ( title.toLowerCase().includes(alternateSearchTerm.toLowerCase()) ) {
      list[i].parentNode.parentNode.parentNode.style.display="block";
    } else {
      list[i].parentNode.parentNode.parentNode.style.display="none";
    }
  }
  search.value = alternateSearchTerm;
};

//Operate clear search button
clearButton.addEventListener('click', () => {
  for (i = 0; i < list.length; i += 1) {
    if (list[i].parentNode.parentNode.parentNode.style.display="none") {
      list[i].parentNode.parentNode.parentNode.style.display="block";
    }
  }
});

//Scrolling past Jumbotron adds title to navbar in WIDE SCREEN.
function navbarTitle() {
  if (window.matchMedia("(min-width: 992px)").matches) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        navbarBrand.style.display = "block";
      } else {
        navbarBrand.style.display = "none";
    }
    } else {
      navbarBrand.style.display = "block";
  }
}
window.onscroll = function() {navbarTitle()};

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
  let cartElement = {};
  cartElement.name = modalTitle.innerHTML
  cartElement.size = modalSizeSelector.options[modalSizeSelector.selectedIndex].text;
  cartElement.quantity = modalQuantitySelector.options[modalQuantitySelector.selectedIndex].text;
  cartElement.price = parseFloat(modalCost.innerHTML).toFixed(2);
  cart.push(cartElement);
  $("#cartPopUp").fadeIn('slow').delay('5000').fadeOut('slow');

});
