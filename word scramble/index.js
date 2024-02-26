const wordText = document.querySelector(".word");
const hint = document.querySelector(".hint");
const timeText = document.querySelector(".time-left b");

const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputText = document.querySelector("#inputText");
let correctWord, timer;

function initTimer(maxTime) {
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time Up!! ${correctWord.toUpperCase()} was the right word.`);
    init();
  }, 1000);
}

function init() {
  initTimer(30);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const wordArray = randomWord.word.split("");
  const shuffledWord = shuffleArray(wordArray);
  wordText.innerText = shuffledWord.join("");
  hint.innerText = randomWord.hint;
  correctWord = randomWord.word.toLowerCase();
  console.log(randomWord.word);
  console.log(shuffledWord);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
init();

refreshBtn.addEventListener("click", init);

checkBtn.addEventListener("click", () => {
  let userWord = inputText.value;
  if (!userWord) return alert(`Please enter a word`);
  if (userWord.toLowerCase() == correctWord) {
    alert(`Congrats!! ${userWord.toUpperCase()} is the right word.`);
    init();
    inputText.value = "";
  } else {
    alert(`Ooops!  ${userWord.toUpperCase()} is not the right word.`);
  }
});
