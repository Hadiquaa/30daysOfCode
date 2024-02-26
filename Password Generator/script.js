let lengthSlider = document.querySelector("#slider");
let lengthDisplay = document.querySelector(".length-display");
let passwordDisplay = document.querySelector("[data-password]");
let upperCheck = document.querySelector("#upperCase");
let lowerCheck = document.querySelector("#lowerCase");
let numberCheck = document.querySelector("#number");
let symbolCheck = document.querySelector("#symbols");
let strengthIndicator = document.querySelector(".indicator");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const generateBtn = document.querySelector(".generatebtn");
const allCheckers = document.querySelectorAll("input[type=checkbox");
const copyBtn = document.querySelector(".copy-btn");
const copyMsg = document.querySelector(".copyMsg");

// setting up the default values
let password = "";
let passwordLength = 10;
let checkCount = 1;
upperCheck.checked = true;
setIndicator("#ccc");
handleSlider();

function handleSlider() {
  lengthSlider.value = passwordLength;
  console.log(passwordLength);
  lengthDisplay.innerText = passwordLength;
}

lengthSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

function setIndicator(color) {
  strengthIndicator.style.backgroundColor = color;
  strengthIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

allCheckers.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckboxChange);
});

function handleCheckboxChange() {
  checkCount = 0;
  allCheckers.forEach((checkbox) => {
    if (checkbox.checked) checkCount += 1;
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

function strengthChecker() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;
  if (upperCheck.checked) hasUpper = true;
  if (lowerCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNumber = true;
  if (symbolCheck.checked) hasSymbol = true;
  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8)
    setIndicator("#0f0");
  else if (
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  )
    setIndicator("#ff0");
  else setIndicator("#f00");
}

// Password Generation starts

// 1 create a function that returns a random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 2 create a function that generates a random number b/w 0-9

function getRandomNumber() {
  return getRandomInt(0, 10);
}

// 3. create a function that generates random uppercase letters
function getUppercaseLetters() {
  return String.fromCharCode(getRandomInt(65, 91));
}

// 4. create a function that generates random lowercase letters

function getLowercaseLetters() {
  return String.fromCharCode(getRandomInt(97, 123));
}

// 5. create a function that generates random symbols

function getSymbol() {
  const symbolArr = Array.from(symbols);
  const randIndex = getRandomInt(0, symbolArr.length);
  return symbolArr[randIndex];
}

generateBtn.addEventListener("click", () => {
  generatePassword();
  strengthChecker();
});

function generatePassword() {
  if (checkCount <= 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  if (password.length) password = "";
  let funcArr = [];
  if (upperCheck.checked) funcArr.push(getUppercaseLetters);
  if (lowerCheck.checked) funcArr.push(getLowercaseLetters);
  if (numberCheck.checked) funcArr.push(getRandomNumber);
  if (symbolCheck.checked) funcArr.push(getSymbol);

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRandomInt(0, funcArr.length);
    password += funcArr[randIndex]();
  }
  password = shuffleArray(Array.from(password));
  passwordDisplay.value = password;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => {
    str += el;
  });
  return str;
}

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (error) {
    copyMsg.innerText = "Failed";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}
