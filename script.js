'use strict';

// Selecionando elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;

// Condições iniciais
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  name0El.textContent = 'Jogador 1';
  name1El.textContent = 'Jogador 2';
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Funcionalidade de rolar dados
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Gerando aleatória de dados
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Exibir dados
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Verifique se rolou
    if (dice !== 1) {
      // Adicionar dados à pontuação atual
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Alternar para o próximo jogador
      switchPlayer();
    }
  }
});

// Funcionalidade de guardar a pontuação
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Adicione a pontuação atual à pontuação do jogador ativo
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Verifique se a pontuação do jogador é maior igual que 100
    if (scores[activePlayer] >= 100) {
      // Termine o jogo
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent =
        'Vencedor!';
    } else {
      // Alternar para o próximo jogador
      switchPlayer();
    }
  }
});

// Funcionalidade de reiniciar o jogo
btnNew.addEventListener('click', init);
