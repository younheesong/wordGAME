const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
//init word
let randomWord;
//init score;
let score = 0;
//init time
let time = 10;
//set difficulty to value in ls or medium

text.focus();

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = difficulty;

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function randomWordToDom() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p> your final score is ${score}</p>
        <button onclick ="location.reload()">reloaded</button>
    `;
    endgameEl.style.display = "flex";
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + `s`;
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

randomWordToDom();

//events
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        randomWordToDom();
        updateScore();
        text.value = ``;
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === "medium") {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

