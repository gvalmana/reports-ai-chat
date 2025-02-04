import OpenAI from 'openai'
import { SalesReport } from './types'

export class ReportInterpreter {
  private static openai: OpenAI
  private static readonly INTERPRETATION_PROMPT = `
    Eres un experto en finanzas y contabilidad con amplia experiencia en análisis de ventas.

    Responde como un asesor financiero experto, enfocándote en:
    - Dar respuestas precisas, fundamentadas y cortas.
    - Responder a las preguntas de manera clara y concisa y basandote en los datos que fueron proporcionados.
    
    Mantén siempre un tono profesional pero amigable. Hazlo resumido y puedes utilizar saltos de linea y e iconos UNICODE HTML para mejorar la legibilidad.
    Da la respuesta en formato markdown y en español.
  `

  private static initOpenAI() {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: process.env.VUE_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      })
    }
  }

  static async interpretSalesReport(report: SalesReport[]): Promise<string> {
    try {
      this.initOpenAI()

      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: this.INTERPRETATION_PROMPT,
          },
          {
            role: 'user',
            content: JSON.stringify(report),
          },
        ],
        model: 'gpt-4o',
        temperature: 0.7,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error('No se recibió respuesta del API')

      return response
    } catch (error) {
      return 'Lo siento, hubo un error al interpretar el reporte.'
    }
  }
}
