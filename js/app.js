const cardDeck = document.querySelector('.card-deck');
const priceTag = cardDeck.querySelectorAll('a.btn-secondary');
const search = document.getElementById('searchTerm');
const submitButton = document.querySelector('#submitSearch');
const list = document.querySelectorAll('#bin h5');
const clearButton = document.querySelector('#clear');
const navbarBrand = document.querySelector('.navbar-brand');
let cakes = [];

//add each cake property to an object and attach object to cakes array.
for (i = 0; i < list.length; i +=1) {
  let cakesElement = {};
  cakesElement.name = list[i].innerHTML;
  cakesElement.price = priceTag[i].innerHTML;
  cakes.push(cakesElement);
}
console.log(cakes);

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
  console.log("success!");
  for (i = 0; i < list.length; i += 1) {
    console.log("success! x2");
    let title = list[i].innerHTML;
    if ( title.toLowerCase().includes(alternateSearchTerm.toLowerCase()) ) {
      list[i].parentNode.parentNode.parentNode.style.display="block";
      console.log("if");
    } else {
      list[i].parentNode.parentNode.parentNode.style.display="none";
      console.log("else");
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
