"use strict";

const $ = (element) => document.getElementById(element);

const $bill = $("bill");

const $tipOptions = document.querySelectorAll('input[type="radio"]');
const $customTip = $("custom-tip");
const $people = $("people");

const $tipAmount = $("tip-amount");
const $tipTotal = $("tip-total");

const $resetBtn = $("reset-btn");
const $errorMsg = $("error-msg");

function getBill() {
  return Number($bill.value);
}

function getTipPercentage() {
  let selectedTip = document.querySelector('input[type="radio"]:checked').value;
  let customTip = $customTip.value / 100;

  return customTip > 0 ? Number(customTip) : Number(selectedTip);
}

function removeError() {
  $people.classList.remove("error");
  $errorMsg.classList.add("hidden");
}

function showError() {
  $people.classList.add("error");
  $errorMsg.classList.remove("hidden");
}

function updateResults(tipAmount, tipTotal) {
  $tipAmount.textContent = "$" + tipAmount.toString();
  $tipTotal.textContent = "$" + tipTotal.toString();
}

function getNumberOfPeople() {
  let numberOfPeople = Number($people.value);
  if (numberOfPeople >= 1) {
    removeError();
    return numberOfPeople;
  } else {
    showError();
    updateResults("0", "0");
  }
}

function resetInputs() {
  let $defaultTip = $("default");
  $defaultTip.checked = true;
  $bill.value = 0;
  $customTip.value = "";
  $people.value = 1;
  updateResults("0", "0");
}

function calculateTip() {
  let people = getNumberOfPeople();
  if (people) {
    let bill = getBill();
    let tipPercentage = getTipPercentage();
    let tip = bill * tipPercentage;

    let tipAmount = tip / people;
    let finalCount = (bill + tip) / people;

    updateResults(tipAmount.toFixed(2), finalCount.toFixed(2));
  }
}

$bill.addEventListener("blur", (event) => {
  event.stopPropagation();
  calculateTip();
});

$tipOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    calculateTip();
  });
});

$customTip.addEventListener("blur", (event) => {
  event.stopPropagation();
  calculateTip();
});

$people.addEventListener("blur", (event) => {
  event.stopPropagation();
  calculateTip();
});

$resetBtn.addEventListener("click", resetInputs);
