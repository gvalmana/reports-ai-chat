<template>
  <div :class="proyect_name">
    <default-layout>
      <router-view></router-view>
    </default-layout>
  </div>
</template>

<script setup lang="ts">
import { proyect_name } from '../config'
import DefaultLayout from './micro/layouts/DefaultLayout.vue'
</script>

<style scoped></style>
