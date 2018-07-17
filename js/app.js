
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

const prices = document.querySelectorAll('.card-body .btn-secondary');
const prices1 = prices.innerHTML;
const array1 = [];

for(let i = 0; i < prices.length; i += 1) {
  eachPrice = prices[i].innerHTML;
  array1.push(eachPrice);
  console.log(i);
  console.log(eachPrice);
}
console.log(array1);
array1.sort();
console.log(array1);

prices[1].sort(function(a, b) {
  var nameA = a.innerHTML.toUpperCase(); // ignore upper and lowercase
  var nameB = b.innerHTML.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
console.log(prices);
// Sort ourcake Divs by price
// $('#priceAscend').on('click', function () {
//  var alphabeticallyOrderedDivs = $('.col-sm-6 .btn-secondary').sort(function(a, b) {
//        return String.prototype.localeCompare.call($(a).text().toLowerCase(), $(b).text().toLowerCase());
//      });
//
//  var cardDeck = $(".card-deck");
//  cardDeck.detach().empty().append(alphabeticallyOrderedDivs);
//  $('#bin').append(cardDeck);
//
// });
