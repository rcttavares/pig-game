/*
REGRAS DO JOGO:

- O jogo tem 2 jogadores, jogando em rodadas
- Em cada turno, um jogador joga um dado quantas vezes quiser. Cada resultado é adicionado à sua pontuação ROUND
- MAS, se o jogador rolar um 1, toda a sua pontuação será perdida. Depois disso, é a vez do próximo jogador
- O jogador pode optar por 'Hold', o que significa que sua pontuação ROUND é adicionada à sua pontuação no GLBAL. Depois disso, é a vez do próximo jogador
- O primeiro jogador a atingir 100 pontos na pontuação GLOBAL ganha o jogo

DESAFIO
Mude o jogo para seguir estas regras:

1. Um jogador perde sua pontuação INTEIRO quando ele rola dois 6 seguidos. Depois disso, é a vez do próximo jogador. (Dica: Sempre salve o rolo de dados anterior em uma variável separada)
2. Adicione um campo de entrada ao HTML onde os jogadores podem definir a pontuação vencedora, para que eles possam alterar a pontuação predefinida de 100. (Dica: você pode ler esse valor com a propriedade .value em JavaScript. Esta é uma boa oportunidade para use o google para descobrir isso :)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // 1. Número aleatório
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Exibir o resultado
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "img/dice-" + dice + ".png";

        // 3. Atualize a pontuação da rodada SE o número rolado NÃO for 1
        if (dice === 6 && lastDice === 6) {
            // Jogador perde pontuação
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            // Adicionar pontuação
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // Próximo jogador
            nextPlayer();
        }
        lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Adicionar pontuação atual à pontuação global
        scores[activePlayer] += roundScore;

        // Atualizar a interface do usuário
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;

        // Indefinido, 0, nulo ou "" são para falso
        // Qualquer outra coisa é para verdadeiro
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Verifique se o jogador ganhou o jogo
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Vencedor!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // Próximo jogador
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Próximo jogador
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
};

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Jogador 1";
    document.getElementById("name-1").textContent = "Jogador 2";
    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
};
