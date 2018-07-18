
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
    $(this).html(
      $(this).find('.col-sm-6').sort(function(a, b) {
        let dsa = parseInt($(a).find('.btn-secondary').eq(0).text()),
            dsb = parseInt($(b).find('.btn-secondary').eq(0).text());
        return (dsa > dsb ? -1 : (dsa < dsb) ? 1 : 0);
      })
    );
  });
});

//prepends dollar sign to price tags in ourcakes
const cardDeck = document.querySelector('.card-deck');
const priceTag = cardDeck.querySelectorAll('a.btn-secondary');
function attachDollarSign(a) {
  let dollarSign = document.createElement('span');
  dollarSign.innerHTML = "$";
  a.insertBefore(dollarSign, a.firstChild);
}

//Call the function for all price tags
for (let i = 0; i < priceTag.length; i += 1 ) {
  attachDollarSign(priceTag[i]);
}
