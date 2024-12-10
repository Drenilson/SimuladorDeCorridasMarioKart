const players = [
    {
      NOME: "Mario",
      VELOCIDADE: 4,
      MANOBRABILIDADE: 3,
      PODER: 3,
      PONTOS: 0,
    },
    {
      NOME: "Peach",
      VELOCIDADE: 3,
      MANOBRABILIDADE: 4,
      PODER: 2,
      PONTOS: 0,
    },
    {
      NOME: "Yoshi",
      VELOCIDADE: 2,
      MANOBRABILIDADE: 4,
      PODER: 3,
      PONTOS: 0,
    },
    {
      NOME: "Bowser",
      VELOCIDADE: 5,
      MANOBRABILIDADE: 2,
      PODER: 5,
      PONTOS: 0,
    },
    {
      NOME: "Luigi",
      VELOCIDADE: 3,
      MANOBRABILIDADE: 4,
      PODER: 4,
      PONTOS: 0,
    },
    {
      NOME: "Donkey Kong",
      VELOCIDADE: 2,
      MANOBRABILIDADE: 2,
      PODER: 5,
      PONTOS: 0,
    },
  ];
  
  function getRandomPlayer(excludePlayer) {
    let availablePlayers = players.filter((player) => player.NOME !== excludePlayer);
    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
  }
  
  async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  async function getRandomBlock() {
    let random = Math.random();
    let result;
  
    switch (true) {
      case random < 0.33:
        result = "RETA";
        break;
      case random < 0.66:
        result = "CURVA";
        break;
      default:
        result = "CONFRONTO";
    }
  
    return result;
  }
  
  async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }
  
  async function playRaceEngine(player1, player2) {
    for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);
  
      let block = await getRandomBlock();
      console.log(`Bloco: ${block}`);
  
      let diceResult1 = await rollDice();
      let diceResult2 = await rollDice();
  
      let totalTestSkill1 = 0;
      let totalTestSkill2 = 0;
  
      if (block === "RETA") {
        totalTestSkill1 = diceResult1 + player1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + player2.VELOCIDADE;
  
        await logRollResult(
          player1.NOME,
          "velocidade",
          diceResult1,
          player1.VELOCIDADE
        );
  
        await logRollResult(
          player2.NOME,
          "velocidade",
          diceResult2,
          player2.VELOCIDADE
        );
      }
  
      if (block === "CURVA") {
        totalTestSkill1 = diceResult1 + player1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + player2.MANOBRABILIDADE;
  
        await logRollResult(
          player1.NOME,
          "manobrabilidade",
          diceResult1,
          player1.MANOBRABILIDADE
        );
  
        await logRollResult(
          player2.NOME,
          "manobrabilidade",
          diceResult2,
          player2.MANOBRABILIDADE
        );
      }
  
      if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + player1.PODER;
        let powerResult2 = diceResult2 + player2.PODER;
  
        console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);
  
        await logRollResult(
          player1.NOME,
          "poder",
          diceResult1,
          player1.PODER
        );
  
        await logRollResult(
          player2.NOME,
          "poder",
          diceResult2,
          player2.PODER
        );
  
        if (powerResult1 > powerResult2 && player2.PONTOS > 0) {
          console.log(
            `${player1.NOME} venceu o confronto! ${player2.NOME} perdeu 1 ponto 🐢`
          );
          player2.PONTOS--;
        }
  
        if (powerResult2 > powerResult1 && player1.PONTOS > 0) {
          console.log(
            `${player2.NOME} venceu o confronto! ${player1.NOME} perdeu 1 ponto 🐢`
          );
          player1.PONTOS--;
        }
  
        if (powerResult1 === powerResult2) {
          console.log("Confronto empatado! Nenhum ponto foi perdido");
        }
      }
  
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1.NOME} marcou um ponto!`);
        player1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${player2.NOME} marcou um ponto!`);
        player2.PONTOS++;
      }
  
      console.log("-----------------------------");
    }
  }
  
  async function declareWinner(player1, player2) {
    console.log("Resultado final:");
    console.log(`${player1.NOME}: ${player1.PONTOS} ponto(s)`);
    console.log(`${player2.NOME}: ${player2.PONTOS} ponto(s)`);
  
    if (player1.PONTOS > player2.PONTOS)
      console.log(`\n${player1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if (player2.PONTOS > player1.PONTOS)
      console.log(`\n${player2.NOME} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate");
  }
  
  (async function main() {
    let player1 = players[Math.floor(Math.random() * players.length)];
    let player2 = getRandomPlayer(player1.NOME);
  
    console.log(
      `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
  
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
  })();
  