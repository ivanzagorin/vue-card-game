<template>
  <div class="card" :class="[flipClass, hideCardClass]" @click="chooseCard">
    <div class="card-front">
      <img src="~@/assets/images/cap.png" alt="">
    </div>
    <div class="card-back">
      <img :src="card.img" alt="">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  setup(props, context) {
    const flipClass = computed(() => {
      if (props.card.visible) return 'flip'
      return ''
    })

    const hideCardClass = computed(() => {
      if (props.card.matched) return 'hidden'
      return ''
    })

    const chooseCard = () => {
      if (props.card.visible || props.card.matched) return false;

      context.emit('select-card', {
        id: props.card.id,
        variant: props.card.variant
      })
    }

    return { flipClass, hideCardClass, chooseCard };
  },
  props: {
    card: {
      required: true
    },
  }
}
</script>