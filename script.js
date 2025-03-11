const words = ["apple", "banana", "orange", "grape", "watermelon", "kiwi", "mango", "pineapple", "strawberry", "blueberry"];
let currentWord = "";
let currentWordIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let wordMistakes = 0;


const wordElement = document.querySelector('.word');
const correctCountElement = document.querySelector('.correct-count');
const wrongCountElement = document.querySelector('.wrong-count');
const wordMistakesElement = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function displayWord(word) {
    wordElement.innerHTML = '';
    wordSpans = [];
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.textContent = word[i];
        span.classList.add('symbol');
        wordSpans.push(span);
        wordElement.appendChild(span);
    }
}

function updateStats() {
    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
    wordMistakesElement.textContent = wordMistakes;
}

function checkInput(input) {
    if (currentWordIndex >= currentWord.length) return;

    const currentChar = currentWord[currentWordIndex];
    if (input === currentChar) {
        wordSpans[currentWordIndex].classList.add('c');
        currentWordIndex++;
    } else {
        wordSpans[currentWordIndex].classList.add('w');
        wordMistakes++;
    }
    updateStats();

    if (currentWordIndex === currentWord.length) {
        correctCount++;
        wordMistakes = 0;
        setTimeout(() => {
            currentWord = getRandomWord();
            displayWord(currentWord);
            currentWordIndex = 0;
        }, 500);
    }
}

document.addEventListener('keypress', (event) => {
    checkInput(event.key);
});



currentWord = getRandomWord();
displayWord(currentWord);



let startTime = new Date().getTime();
let timerInterval = setInterval(() => {
    let elapsedTime = new Date().getTime() - startTime;
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);