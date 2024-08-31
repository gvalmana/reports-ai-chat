<template>
  <SCard title="" class="home">
    <div class="home__card">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld :title="companyName"></HelloWorld>

      <nav>
        <router-link to="/configuration">Page 1</router-link> |
        <router-link to="/configuration/about">Page 2</router-link> |
      </nav>

      <div class="home__form">
        <SInput v-model="name" :label="$transF('name')" size="small" />
        <SInput v-model="email" :label="$transF('email')" size="small" />
      </div>

      <router-link to="/configuration/about">
        <SButton>
          {{ $transF('submit') }}
        </SButton>
      </router-link>
    </div>
  </SCard>
</template>

<script setup lang="ts">
import { SCard, SInput, SButton } from '@alegradev/smile-ui-next'
import { useSessionStore } from 'app_alegra_commons/session'
import HelloWorld from '../components/HelloWorld.vue'
import { $transF } from 'app_alegra_commons/translate'
import { computed, ref } from 'vue'

const name = ref()
const email = ref()

const SESSION = useSessionStore()

const companyName = computed(() => SESSION.company.name)
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
