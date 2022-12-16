<template>
  <div class="flex bg-sm-greyblue1 max-h-screen">
    <div class="tp-sidebar bg-sm-brand1"></div>
    <div class="flex flex-col w-full bg-slate-100">
      <div class="h-[56px] max-h-[56px] w-full bg-white drop-shadow"></div>
      <div class="flex w-full overflow-auto px-5 py-8 grow relative justify-center">
        <div v-if="loading" class="tp-content-loading">
          <sm-progress-circle></sm-progress-circle>
        </div>

        <div v-else class="tp-content-micro">
          <slot></slot>
        </div>
      </div>
      <AppFloatingButton></AppFloatingButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SmProgressCircle } from '@alegradev/smile-ui-next'
import { useAppStore } from 'app_alegra_commons/app'
import { computed, onMounted } from 'vue'
import AppFloatingButton from 'app_alegra_commons/appFloatingButton'

import { convertDictionaryToObject } from '../utils/appHelpers'
import useMicrofront from '../composables/useMicrofront'

const { loadUserInfo } = useMicrofront()

onMounted(async () => {
  await loadUserInfo(convertDictionaryToObject())
})

const APP = useAppStore()

const loading = computed(() => {
  return Boolean(APP.globalLoading)
})
</script>

<style lang="scss" scoped>
.tp-sidebar {
  @apply relative;
  @apply basis-0;
  @apply grow-0;
  @apply h-screen;
  @apply shrink-0;
  @apply overflow-x-auto;

  @media screen and (min-width: 1180px) {
    @apply basis-[220px];
  }
}
.tp-content-micro {
  @apply w-full;
  @media screen and (min-width: 1180px) {
    @apply max-w-[1024px];
  }
}
.tp-content-loading {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
