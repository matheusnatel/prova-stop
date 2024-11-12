// Variáveis do jogo
const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');
const restartBtn = document.getElementById('restart-btn');
const letterDisplay = document.getElementById('letter-display');
const statusText = document.getElementById('status');
const timerDisplay = document.getElementById('timer');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');

const categories = {
  name: document.getElementById('name'),
  animal: document.getElementById('animal'),
  city: document.getElementById('city'),
  food: document.getElementById('food'),
  color: document.getElementById('color'),
  fruit: document.getElementById('fruit'),
  professor: document.getElementById('professor'),
};

const correctSound = new Audio('correct.mp3');
const errorSound = new Audio('error.mp3');

let currentLetter = '';
let gameStarted = false;
let timeRemaining = 60;
let timerInterval;

// Função para sortear uma letra aleatória
function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Função para começar o jogo
function startGame() {
  currentLetter = getRandomLetter();
  letterDisplay.textContent = currentLetter;
  gameStarted = true;
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  // Habilitar o botão de finalizar
  finishBtn.disabled = false;
  restartBtn.disabled = false;

  // Limpar os campos e permitir preenchimento
  Object.values(categories).forEach(input => {
    input.disabled = false;
    input.value = ''; // Limpa os valores anteriores
    input.classList.remove('correct', 'error'); // Limpa a classe de status
  });

  // Começar o temporizador
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      finishGame();
    }
  }, 1000);
}

// Função para finalizar o jogo
function finishGame() {
  if (!gameStarted) return;

  clearInterval(timerInterval);

  let correctCount = 0;

  Object.keys(categories).forEach(category => {
    const input = categories[category];
    const value = input.value.trim().toUpperCase();
    
    if (value.startsWith(currentLetter)) {
      input.classList.add('correct');
      correctCount++;
      correctSound.play();
    } else {
      input.classList.add('error');
      errorSound.play();
    }
  });

  statusText.textContent = `Você completou ${correctCount} de ${Object.keys(categories).length} categorias corretamente!`;

  // Desabilitar inputs e botões
  Object.values(categories).forEach(input => input.disabled = true);
  finishBtn.disabled = true;
  restartBtn.disabled = false;
}

// Função para reiniciar o jogo
function restartGame() {
  timeRemaining = 60;
  timerDisplay.textContent = timeRemaining;
  startGame();
}

// Eventos
startBtn.addEventListener('click', startGame);
finishBtn.addEventListener('click', finishGame);
restartBtn.addEventListener('click', restartGame);
