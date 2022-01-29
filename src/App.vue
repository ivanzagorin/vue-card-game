<template>
  <div id="nav" class="nav container">
    <router-link to="/">Игровое поле</router-link>
    <router-link to="/leaderboard">Таблица результатов</router-link>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/scss/style';
</style>