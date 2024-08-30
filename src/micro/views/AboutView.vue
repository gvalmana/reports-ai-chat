<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/configuration">
      <SButton>Page 1</SButton>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { SButton } from '@alegradev/smile-ui-next'
</script>

<style scoped></style>
