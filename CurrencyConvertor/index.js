let display = document.querySelector("#exchange-rate");
let dropList = document.querySelectorAll("select");
let button = document.querySelector("button");
let fromCurrency = document.querySelector(".from-container select");
let toCurrency = document.querySelector(".to-container select");
let reverse = document.querySelector(".exchange-symbol");

for (let i = 0; i < dropList.length; i++) {
  for (country_code in country_list) {
    // setting default values
    if (i == 0) {
      selected = country_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = country_code == "INR" ? "selected" : "";
    }
    // creating the option tag
    let optionTag = `<option value="${country_code}" ${selected}>${country_code}</option>`;
    // inserting it to the dom
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let c = country_list[code].toLowerCase();
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://www.worldometers.info//img/flags/small/tn_${c}-flag.gif`;
    }
  }
}

reverse.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

function getExchangeRate() {
  let amount = document.querySelector("#amount");

  let amountVal = amount.value;
  if (amountVal == 0 || amountVal == "") {
    amount.value = 1;
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/6637ec4d0270be0733094002/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = exchangeRate * amountVal;
      display.value = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    });
}
