const $ = (el) => document.querySelector(el);

const $bill = $("#bill");
const $customTip = $("#custom-tip");
const $people = $("#people");

const $tipAmount = $("#tip-amount");
const $tipTotal = $("#tip-total");

const $resetBtn = $("#reset-btn");
const $errorMsg = $("#error-msg");

let tipPercentage = 0;
function calcTip() {
  let bill = Number($bill.value);
  let people = Number($people.value);

  if (Number($customTip.value) > 0) {
    tipPercentage = Number($customTip.value) / 100;
  } else {
    tipPercentage = document.querySelector('input[type="radio"]:checked').value;
  }
  if (people > 0) {
    $people.classList.remove("error");
    $errorMsg.classList.add("hidden");

    $tipAmount.textContent = (bill * tipPercentage) / people;
    $tipTotal.textContent = (bill + bill * tipPercentage) / people;
  } else {
    $people.classList.add("error");
    $errorMsg.classList.remove("hidden");
    $tipAmount.textContent = "0";
    $tipTotal.textContent = "0";
  }
}

const $tips = document.querySelectorAll('input[type="radio"]');
$tips.forEach((tip) =>
  tip.addEventListener("click", (event) => {
    calcTip();
  })
);
$customTip.addEventListener("blur", (event) => {
  event.stopPropagation;
  calcTip();
});

$bill.addEventListener("blur", (event) => {
  event.stopPropagation();
  calcTip();
});

$customTip.addEventListener("blur", (event) => {
  event.stopPropagation();
  calcTip();
});

$people.addEventListener("blur", (event) => {
  event.stopPropagation();
  calcTip();
});
