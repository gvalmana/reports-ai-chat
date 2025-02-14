import { CompletionRepository, IAiMessage } from '../domain/CompletionRepository'
import { ReportTypes } from '../interfaces/IReports'

export class IntentAnalyzerTool {
  constructor(private repository: CompletionRepository) {}

  async run(messages: IAiMessage[]) {
    try {
      const response = await this.repository.completeWithTool({
        messages: [messages[messages.length - 1]],
        tools: [
          {
            type: 'function',
            function: {
              name: 'fetchReport',
              description: 'Obtiene un reporte basado en un rango de fechas.',
              parameters: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: [ReportTypes.SALES, ReportTypes.PURCHASES],
                    description: 'Tipo de reporte solicitado.',
                  },
                  dateRange: {
                    type: 'object',
                    properties: {
                      from: {
                        type: 'string',
                        format: 'date',
                        description: 'Fecha de inicio (YYYY-MM-DD)',
                      },
                      to: {
                        type: 'string',
                        format: 'date',
                        description: 'Fecha de fin (YYYY-MM-DD)',
                      },
                    },
                    required: ['from', 'to'],
                  },
                },
                required: ['type', 'dateRange'],
              },
            },
          },
        ],
        toolChoice: 'auto',
      })

      return response.tool_calls
    } catch (error) {
      console.error('Error analyzing intent:', error)
      return null
    }
  }
}
