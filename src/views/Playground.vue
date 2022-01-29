<template>
  <div class="container">
    <div class="empty-playground" v-if="!gameStarted">
      <button @click="startGame" class="btn btn-yellow">Начать игру</button>
    </div>
    <div class="playground" v-else>
      <div class="playground-manage">
        <div class="playground-btns">
          <button v-if="gamePaused && !gameWon && !gameLost" @click="continueGame" class="btn btn-yellow btn-fix-width">Продолжить</button>
          <button v-else @click="pauseGame" class="btn btn-yellow btn-fix-width" :disabled="gameWon || gameLost">Пауза</button>
          <button @click="restartGame" class="btn btn-blue">Новая игра</button>
        </div>
        <div class="playground-timer">
          {{ convert(totalTime) }}
        </div>
      </div>
      <Card v-for="(card, key) in cards" :key="key" :card="card" @select-card="selectCard"/>
      <GameMessage :message="message" v-if="gameWon || gameLost"/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex'
import { convertTime } from '../helpers';
import Card from '../components/Card.vue';
import GameMessage from '../components/GameMessage.vue';
import createGame from '../features/createGame';

export default {
  setup() {
    const { cards, userCanFlip, gameWon, gameLost, message, gameStarted, gamePaused, startGame, restartGame, pauseGame, continueGame, totalTime } = createGame();
    const store = useStore();
    const stepTime = ref(5);
    let stepInterval;

    const selectCard = payload => {
      if (userCanFlip.value) {
        userCanFlip.value = false;
        
        cards.value.map(el => {
          if (el.id == payload.id && el.variant == payload.variant) el.visible = true;
        });

        let openedCards = cards.value.filter(card => card.visible === true && card.matched === false);

        if (openedCards.length == 1) {
          stepInterval = setInterval(() => stepTime.value--, 1000);
        }

        if (openedCards.length > 1) {

          resetStep();

          if (openedCards[0].id === openedCards[1].id) {
            setTimeout(() => {
              openedCards.forEach(el => el.matched = true)
              if (!cards.value.some((card) => card.matched === false)) gameWon.value = true
            }, 500);
          } else {
            setTimeout(() => openedCards.forEach(el => el.visible = false), 700);
          }
        }

        setTimeout(() => userCanFlip.value = true, 500);
      }
    }

    watch(
      () => stepTime.value, 
      (time) => {
        if (time === 0) {
          resetStep();
          cards.value.map(el => el.visible = false);
        }
      }
    );

    const resetStep = () => {
      stepTime.value = 5;
      clearInterval(stepInterval);
    }
    
    const convert = convertTime;

    onBeforeRouteLeave(() => {
      if (!gamePaused.value) gamePaused.value = true
      cards.value.map(el => { if (el.visible && !el.matched) el.visible = false });
      store.commit('saveGame', {
        cards: cards.value, 
        gameStarted: gameStarted.value, 
        gamePaused: gamePaused.value, 
        totalTime: totalTime.value,
        gameWon: gameWon.value,
        gameLost: gameLost.value,
        message: message.value
      })
    })

    return { cards, gameStarted, gamePaused, gameWon, gameLost, message, totalTime, startGame, restartGame, pauseGame, continueGame, convert, selectCard };
  },
  components: {
    Card, GameMessage
  }
}
</script>