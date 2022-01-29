<template>
  <div class="leaderboard container">
    <div v-if="leaders.length > 0">
      <div class="leaderboard-item" v-for="(time, key) in leaders" :key="key"><span>{{ key + 1 }} место</span> {{ convert(time) }}</div>
    </div>
    <div class="empty-playground" v-else>
      <div class="empty-playground-title">Нет результатов</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { convertTime } from '../helpers';

export default {
  setup() {
    const store = useStore();
    const convert = convertTime;
    const leaders = store.getters.leaderBoard;
    leaders.sort((a, b) => a - b);

    return { leaders, convert };
  },
}
</script>