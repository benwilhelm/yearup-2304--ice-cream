/**
 * This file is basically a copy of scripts.js, but with some minor
 * tweaks to make the form update immediately on any change. The differences
 * between this file and that file are noted in comments below
 */

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

// I'm removing the button with javascript, rather than
// create a whole separate HTML file without a button
btnEl.remove();

// Since we don't have a button anymore, we're going to take
// the anonymous function that had been assigned to btn.onclick
// and instead give it a name that describes what it does. We'll
// then assign this function to the onchange handler of every input
// on the page, which will trigger it any time an input value changes
function updatePrices() {
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
}

// We *could* manually attach the updatePrices handler to each
// element's onchange event, similar to what you see done below
// on lines 63 and 64 with cupEl.onchange and coneEl.onchange.
// That would be very tedious, and difficult to keep up to date
// if you added more inputs.
// Instead, we're going to use the querySelectorAll method to get a
// collection of all of the inputs on the page, then use the forEach
// method to attach an event listener to each one in a loop.
// This is a preview of what we'll get into next week, but do some research
// on your own and see if you can figure out how it works.
document.querySelectorAll('input').forEach(function (input) {
  input.addEventListener('change', updatePrices);
});

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
