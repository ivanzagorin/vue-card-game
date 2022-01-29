import createCards from '../features/createCards';
import { useStore } from 'vuex'
import { ref, watch } from 'vue';

export default function createGame() {
  const { cards } = createCards();
  let gameStarted = ref(false);
  let gamePaused = ref(false);
  let gameWon = ref(false);
  let gameLost = ref(false);
  let totalTime = ref();
  let message = ref('');
  const userCanFlip = ref(false);
  const gameTime = 300;
  let ticker;

  const store = useStore();
  const currentGame = store.getters.game;
  if (currentGame) {
    cards.value = currentGame.cards;
    gameStarted.value = currentGame.gameStarted;
    gamePaused.value = currentGame.gamePaused;
    totalTime.value = currentGame.totalTime;
    gameWon.value = currentGame.gameWon;
    gameLost.value = currentGame.gameLost;
    message.value = currentGame.message;
  }

  const startGame = () => {
    dropRefs();
    ticker = setInterval(() => totalTime.value-- , 1000);
  }

  const dropRefs = () => {
    cards.value = createCards().cards.value;
    gameStarted.value = true;
    gamePaused.value = false;
    gameWon.value = false;
    gameLost.value = false;
    userCanFlip.value = true;
    totalTime.value = gameTime;
  }

  const restartGame = () => {
    cards.value.map(el => el.visible = false);
    clearInterval(ticker);
    setTimeout(() => {
      startGame()
    }, 500)
  }
  
  const pauseGame = () => {
    gamePaused.value = true;
    userCanFlip.value = false;
    clearInterval(ticker);
  }

  const continueGame = () => {
    gamePaused.value = false;
    userCanFlip.value = true;
    ticker = setInterval(() => totalTime.value-- , 1000);
  }
  
  watch(
    () => totalTime.value, 
    (time) => {
      if (time === 0) {
        clearInterval(ticker);
        gameLost.value = true;
        userCanFlip.value = false
      }
    }
  )
  
  watch(
    () => gameWon.value, 
    (win) => { 
      if(win) {
        clearInterval(ticker);
        message.value = 'Вы выиграли!';
        store.commit('addGameResult', gameTime - totalTime.value);
      }
    }
  )
  
  watch(
    () => gameLost.value, 
    (lost) => { 
      if(lost) message.value = 'Вы проиграли(';
    }
  )

  return {
    cards,
    totalTime,
    gameWon,
    gameLost,
    message,
    userCanFlip,
    gameStarted,
    gamePaused,
    startGame,
    restartGame,
    continueGame,
    pauseGame
  }
}
