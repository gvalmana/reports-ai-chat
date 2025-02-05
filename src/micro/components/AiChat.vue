<template>
  <div class="h-full w-full flex flex-col bg-white rounded-xl">
    <!-- Header (fixed) -->
    <header class="bg-white border-b p-4 flex-none rounded-t-xl">
      <h1 class="text-[15px] font-medium text-gray-800">{{ 'Alegra AI' }}</h1>
    </header>

    <!-- Chat Window (scrollable) -->
    <div class="flex-1 p-4 space-y-3 overflow-y-auto" ref="chatWindow">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['flex', message.isUser ? 'justify-end' : 'justify-start']"
      >
        <div
          :class="[
            'max-w-[80%] break-words rounded-2xl p-3',
            message.isUser ? 'bg-teal-500 text-white' : 'bg-gray-50 text-gray-800 border',
          ]"
        >
          <div v-if="message.isUser">{{ message.content }}</div>
          <div v-else class="markdown-content" v-html="formatMessage(message.content)"></div>
        </div>
      </div>

      <!-- Writing indicator -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-gray-50 text-gray-800 border rounded-2xl p-3">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area (fixed) -->
    <div class="border-t bg-white p-4 flex-none rounded-b-xl">
      <div class="flex space-x-2">
        <SInput
          v-model="userInput"
          @keyup.enter="sendMessage"
          :placeholder="$transF('aiChat.placeholder')"
          :disabled="isLoading"
          size="medium"
          class="flex-1"
        />

        <SButton @click="sendMessage" :disabled="!userInput.trim() || isLoading" size="medium">
          {{ isLoading ? $transF('aiChat.sending') : $transF('aiChat.send') }}
        </SButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $transF } from 'app_alegra_commons/translate'
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { SButton, SInput } from '@alegradev/smile-ui-next'

type ChatMessage = {
  content: string
  isUser: boolean
}

marked.setOptions({
  headerIds: false,
  mangle: false,
})

const messages = ref<ChatMessage[]>([])
const userInput = ref('')
const chatWindow = ref<HTMLElement | null>(null)
const isLoading = ref(false)

const sendMessage = async () => {
  const trimmedInput = userInput.value.trim()
  if (!trimmedInput || isLoading.value) return

  messages.value.push({
    content: trimmedInput,
    isUser: true,
  })

  userInput.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockResponse = `Recibí tu mensaje: "${trimmedInput}"\n\nEste es un ejemplo de respuesta que pueden personalizar durante el workshop.`

    messages.value.push({
      content: mockResponse,
      isUser: false,
    })
  } catch (error) {
    messages.value.push({
      content: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.',
      isUser: false,
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (chatWindow.value) {
    setTimeout(() => {
      chatWindow.value!.scrollTop = chatWindow.value!.scrollHeight
    }, 100)
  }
}

const formatMessage = (content: string) => {
  try {
    return marked(content)
  } catch (error) {
    return content
  }
}

onMounted(() => {
  messages.value.push({
    content: $transF('aiChat.hello'),
    isUser: false,
  })
})
</script>

<style scoped>
.markdown-content :deep(h3) {
  font-size: 1.1em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
}

.markdown-content :deep(p) {
  margin: 0.5em 0;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(li) {
  margin: 0.25em 0;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}
</style>
