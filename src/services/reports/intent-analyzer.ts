import OpenAI from 'openai'
import { ReportIntent } from './types'

export class IntentAnalyzer {
  private static openai: OpenAI
  private static readonly INTENT_PROMPT = `
    Analiza el siguiente mensaje y determina si el usuario está solicitando un reporte.
    Si es así, identifica:
    1. Tipo de reporte (sales, expenses, etc.)
    2. Rango de fechas mencionado (si existe)
    
    Responde en formato JSON:
    {
      "isReport": boolean,
      "type": string | null,
      "dateRange": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" } | null
    }
  `

  private static initOpenAI() {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: process.env.VUE_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      })
    }
  }

  static async analyzeIntent(message: string): Promise<ReportIntent | null> {
    try {
      this.initOpenAI()

      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: this.INTENT_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error('No se recibió respuesta del API')

      const result = JSON.parse(response)

      if (!result.isReport) return null

      return {
        type: result.type,
        dateRange: result.dateRange,
      }
    } catch (error) {
      console.error('Error analyzing intent:', error)
      return null
    }
  }
}
