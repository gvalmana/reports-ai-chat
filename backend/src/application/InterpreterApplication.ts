import { CompletionRepository } from '../domain/CompletionRepository'
import { ReportTypes } from '../interfaces/IReports'

export class Interpreter {
  private readonly PROMPTS_BY_REPORTS = {
    sales: `
      Eres un experto en finanzas y contabilidad con amplia experiencia en análisis de ventas.
      Tu tarea es interpretar los datos de las ventas y generar un resumen de las ventas.
      La formula es total = subtotal - discount - creditNote - tax.
    `,
    purchases: `
      Eres un experto en finanzas y contabilidad con amplia experiencia en análisis de compras.
      Tu tarea es interpretar los datos de las compras y generar un resumen de las compras.
    `,
  }

  constructor(private repository: CompletionRepository) {}

  async run(data: unknown, ReportTypes: ReportTypes) {
    if (!(ReportTypes in this.PROMPTS_BY_REPORTS)) throw new Error('Report type not found')

    return await this.repository.complete({
      messages: [
        {
          role: 'system',
          content: this.PROMPTS_BY_REPORTS[ReportTypes],
        },
        {
          role: 'user',
          content: JSON.stringify(data),
        },
      ],
      includeReason: false,
    })
  }
}
