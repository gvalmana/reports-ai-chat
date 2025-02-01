<template>
  <AiChat></AiChat>
</template>

<script setup lang="ts">
import AiChat from '../components/AiChat.vue'
</script>

<style lang="scss" scoped>
.home {
  &__card {
    @apply p-4;
    @apply flex items-center flex-col;
  }
  &__form {
    @apply grid grid-cols-2 gap-2;
    @apply my-5;
  }
  img {
    @apply w-24 h-24;
  }
}
</style>
