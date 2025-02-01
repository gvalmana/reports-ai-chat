import { DateRange, ReportResponse, SalesReport } from './types'

export class ReportService {
  static async getSalesReport(dateRange: DateRange): Promise<ReportResponse<SalesReport[]>> {
    try {
      const response = await fetch(
        `https://gates.alegra.com/api/v1/invoices/sales-totals?from=${dateRange.from}&to=${dateRange.to}&groupBy=day`,
        {
          headers: {
            authorization: `Bearer ${process.env.VUE_APP_ALEGRA_API_KEY}`,
            accept: 'application/json',
          },
        }
      )

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      return { success: false, error: 'Error fetching sales report' }
    }
  }
}
