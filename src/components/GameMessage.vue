<template>
  <div class="playground-message">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>