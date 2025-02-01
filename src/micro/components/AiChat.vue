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
      <!-- Indicador de escritura -->
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
    <div class="border-t bg-white p-4 flex-none rounded-xl">
      <div class="flex space-x-2">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Escribe tu mensaje..."
          :disabled="isLoading"
          class="flex-1 rounded-xl border p-2 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          @click="sendMessage"
          :disabled="!userInput.trim() || isLoading"
          class="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 disabled:opacity-50 text-sm font-medium"
        >
          {{ isLoading ? 'Enviando...' : 'Enviar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { aiChatService, type ChatMessage } from '@/services/ai-chat'
import { IntentAnalyzer } from '@/services/reports/intent-analyzer'
import { ReportService } from '@/services/reports/report-service'
import { ReportInterpreter } from '@/services/reports/report-interpreter'
import { marked } from 'marked'

// Configurar marked para que sea seguro
marked.setOptions({
  headerIds: false,
  mangle: false,
})

// State
const messages = ref<ChatMessage[]>([])
const userInput = ref('')
const chatWindow = ref<HTMLElement | null>(null)
const isLoading = ref(false)

// Methods
const sendMessage = async () => {
  const trimmedInput = userInput.value.trim()
  if (!trimmedInput || isLoading.value) return

  // Add user message
  messages.value.push({
    content: trimmedInput,
    isUser: true,
  })

  userInput.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    // Analizar la intención del mensaje
    const intent = await IntentAnalyzer.analyzeIntent(trimmedInput)

    if (intent?.type === 'sales') {
      // Obtener el reporte de ventas
      const report = await ReportService.getSalesReport(intent.dateRange!)

      if (report.success && report.data) {
        // Interpretar el reporte
        const interpretation = await ReportInterpreter.interpretSalesReport(report.data)

        messages.value.push({
          content: interpretation,
          isUser: false,
        })
      } else {
        messages.value.push({
          content: 'Lo siento, hubo un error al obtener el reporte de ventas.',
          isUser: false,
        })
      }
    } else {
      // Procesar mensaje normal con ChatGPT
      const response = await aiChatService.sendMessage(trimmedInput, messages.value)
      messages.value.push({
        content: response.success
          ? response.message
          : response.error || 'Error al procesar el mensaje',
        isUser: false,
      })
    }
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

// Lifecycle
onMounted(() => {
  messages.value.push({
    content: '¡Hola! ¿En qué puedo ayudarte hoy?',
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
