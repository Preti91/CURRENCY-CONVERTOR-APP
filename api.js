const base = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const drop = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

// Fill dropdowns
for (let select of drop) {
  for (let curCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curCode;
    newOption.value = curCode;

    if (select.name === "from" && curCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && curCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag
const updateFlag = (element) => {
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Convert button
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amtInput = document.querySelector(".amount input");
  let amtVal = Number(amtInput.value);
  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amtInput.value = "1";
  }

  let from = document.querySelector(".from select").value.toLowerCase();
  let to = document.querySelector(".to select").value.toLowerCase();

  const url = `${base}${from}.json`;
  let res = await fetch(url);
  let data = await res.json();
  let rate = data[from][to];

  let total = amtVal * rate;
  document.querySelector(".result").innerText = `${amtVal} ${from.toUpperCase()} = ${total.toFixed(2)} ${to.toUpperCase()}`;
});
