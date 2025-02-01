import OpenAI from 'openai'
import { SalesReport } from './types'

export class ReportInterpreter {
  private static openai: OpenAI
  private static readonly INTERPRETATION_PROMPT = `
    Eres un experto en finanzas y contabilidad con amplia experiencia en análisis de ventas.
    
    Si la pregunta del usuario es general o solicita un análisis completo, proporciona el siguiente formato:

    📊 Resumen General
    - Total de ventas
    - Promedio diario
    
    📅 Fechas Destacadas
    - Mejor día (fecha y monto)
    - Peor día (fecha y monto)
    - Patrones importantes
    
    📈 Tendencias
    - Comportamiento general
    - Patrones semanales
    
    💡 Recomendaciones
    - Oportunidades identificadas
    - Áreas de mejora

    Si la pregunta es específica, responde como un asesor financiero experto, enfocándote en:
    - Dar respuestas precisas y fundamentadas
    - Proporcionar contexto relevante
    - Sugerir acciones concretas basadas en los datos
    - Explicar las implicaciones financieras
    
    Mantén siempre un tono profesional pero amigable.
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
