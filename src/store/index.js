import { createStore } from 'vuex'

export default createStore({
  state: {
    game: null,
    leaderBoard: []
  },
  getters: {
    game: s => s.game,
    leaderBoard: s => s.leaderBoard,
  },
  mutations: {
    saveGame(state, gameInfo){
      state.game = gameInfo
    },
    addGameResult(state, time){
      state.leaderBoard.push(time)
    }
  }
})
