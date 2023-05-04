// Notice that because we're loading the script at the END of the
// HTML file, we don't need to use the onload property. We can
// get references to our elements right here in the outermost
// scope of the JS file, which means we can reuse these variables
// below. Neat!
const numScoopsEl = document.getElementById('numberOfScoops');
const btnEl = document.getElementById('submit');
const basePriceEl = document.getElementById('basePrice');

// Using an anonymous function instead of a named function.
// Not sure what I'm talking about? Look back at page 3-3 of
// the workbook
btnEl.onclick = function () {
  const numScoops = +numScoopsEl.value;
  const basePrice = getBasePrice(numScoops);
  basePriceEl.innerHTML = basePrice.toFixed(2);
};

// I wrote a little function for getting the base
// price based on the number of scoops. It assumes you're passing
// it a number between 1 and 4, and it will return to you
// the price
function getBasePrice(numberOfScoops) {
  const firstScoopPrice = 2.25;
  const addlScoopPrice = 1.25;

  const numberOfAdditionalScoops = numberOfScoops - 1;
  const priceForAllAdditionalScoops = numberOfAdditionalScoops * addlScoopPrice;
  return firstScoopPrice + priceForAllAdditionalScoops;
}
