import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

// Types
export interface ChatMessage {
  content: string
  isUser: boolean
}

export interface ChatResponse {
  success: boolean
  message: string
  error?: string
}

class AIChatService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.VUE_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // Solo para desarrollo, en producción las llamadas deberían ir a través de un backend
    })
  }

  async sendMessage(message: string, previousMessages: ChatMessage[] = []): Promise<ChatResponse> {
    try {
      // Convertir el historial de mensajes al formato que espera OpenAI
      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `Eres un asistente útil y honesto. Si no entiendes algo o hay algún error, 
          debes responder claramente que hay un problema y sugerir intentar nuevamente. 
          No debes inventar información ni dar ejemplos si no estás seguro. 
          Si no puedes procesar o entender la solicitud, indica claramente que necesitas más clarificación.`,
        },
        ...previousMessages.map(m => ({
          role: (m.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user', content: message },
      ]

      const completion = await this.openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 500,
      })

      const response = completion.choices[0]?.message?.content

      if (!response) {
        throw new Error('No se recibió respuesta del API')
      }

      return {
        success: true,
        message: response,
      }
    } catch (error) {
      console.error('Error al enviar mensaje a OpenAI:', error)
      return {
        success: false,
        message: '',
        error: 'Error al procesar tu mensaje. Por favor, intenta nuevamente.',
      }
    }
  }
}

export const aiChatService = new AIChatService()
