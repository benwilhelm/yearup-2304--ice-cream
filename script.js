// Notice that because we're loading the script at the END of the
// HTML file, we don't need to use the onload property. We can
// get references to our elements right here in the outermost
// scope of the JS file, which means we can reuse these variables
// below. Neat!
const numScoopsEl = document.getElementById('numberOfScoops');
const cupEl = document.getElementById('cupOrCone_cup');
const coneEl = document.getElementById('cupOrCone_cone');

const btnEl = document.getElementById('submit');

const toppingsEl = document.getElementById('toppings');
const sprinklesEl = document.getElementById('toppingsSprinkles');
const whippedCreamEl = document.getElementById('toppingsWhippedCream');
const hotFudgeEl = document.getElementById('toppingsHotFudge');
const cherryEl = document.getElementById('toppingsCherry');

const basePriceEl = document.getElementById('basePrice');
const toppingsCostEl = document.getElementById('toppingsCost');
const taxEl = document.getElementById('tax');
const totalDueEl = document.getElementById('totalDue');

// Using an anonymous function instead of a named function.
// Not sure what I'm talking about? Look back at page 3-3 of
// the workbook
btnEl.onclick = function () {
  const numScoops = +numScoopsEl.value;
  const basePrice = getBasePrice(numScoops);
  basePriceEl.innerHTML = basePrice.toFixed(2);

  const toppingsCost = getToppingsCost();
  toppingsCostEl.innerHTML = toppingsCost.toFixed(2);

  const subtotal = basePrice + toppingsCost;
  const tax = getTax(subtotal);
  taxEl.innerHTML = tax.toFixed(2);

  const totalDue = subtotal + tax;
  totalDueEl.innerHTML = totalDue.toFixed(2);
};

cupEl.onchange = onCupConeChange;
coneEl.onchange = onCupConeChange;

function onCupConeChange() {
  if (cupEl.checked) {
    toppingsEl.style.display = 'flex';
  } else {
    toppingsEl.style.display = 'none';
  }
}

// I wrote a little function for getting the base
// price based on the number of scoops. It assumes you're passing
// it a number between 1 and 4, and it will return to you
// the price
function getBasePrice(numberOfScoops) {
  // we haven't talked about throwing errors, but this line
  // checks to see if the number of scoops is within acceptable bounds
  if (numberOfScoops < 1 || numberOfScoops > 4) {
    throw new Error('numberOfScoops must be between 1 and 4');
  }

  const firstScoopPrice = 2.25;
  const addlScoopPrice = 1.25;

  const numberOfAdditionalScoops = numberOfScoops - 1;
  const priceForAllAdditionalScoops = numberOfAdditionalScoops * addlScoopPrice;
  return firstScoopPrice + priceForAllAdditionalScoops;
}

function getToppingsCost() {
  let toppingsCost = 0;
  // only calculate toppingsCost if user selected cup
  if (cupEl.checked) {
    if (sprinklesEl.checked) {
      toppingsCost += 0.5;
    }
    if (whippedCreamEl.checked) {
      toppingsCost += 0.25;
    }
    if (hotFudgeEl.checked) {
      toppingsCost += 1.25;
    }
    if (cherryEl.checked) {
      toppingsCost += 0.25;
    }
  }

  return toppingsCost;
}

function getTax(amount) {
  const tax = 0.11; // 11% sales tax
  return amount * tax;
}
