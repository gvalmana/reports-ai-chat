import { CompletionRepository } from '../domain/CompletionRepository'
import { IAiMessage } from '@/domain/index'
import { ReportTypes } from '../interfaces/IReports'
interface ReportIntent {
  isReport: boolean
  type: ReportTypes | null
  dateRange: {
    from: string
    to: string
  } | null
}

export class IntentAnalyzer {
  private static readonly INTENT_PROMPT = `
    Analiza el siguiente mensaje y determina si el usuario está solicitando un reporte.

    Si es así, identifica:
    1. Tipo de reporte (sales, purchases, etc.)
    2. Rango de fechas mencionado (si existe)
    
    Responde solo con el formato JSON sin ningún comentario ni caracteres adicionales:
    {
      "isReport": boolean,
      "type": sales | purchases | null,
      "dateRange": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" } | null
    }
  `

  constructor(private repository: CompletionRepository) {}

  async run(messages: IAiMessage[]) {
    try {
      const message = await this.repository.complete({
        messages: [
          {
            role: 'system',
            content: IntentAnalyzer.INTENT_PROMPT,
          },
          messages[messages.length - 1],
        ],
        includeReason: false,
      })

      const messageJson = JSON.parse(message.content) as unknown as ReportIntent
      if (!messageJson?.isReport) return null

      return {
        type: messageJson.type,
        dateRange: messageJson.dateRange,
      }
    } catch (error) {
      console.error('Error analyzing intent:', error)
      return null
    }
  }
}
