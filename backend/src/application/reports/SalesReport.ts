import axios from 'axios'
import { IDateRange } from '../../interfaces/IReports'

export class SalesReport {
  constructor(private alegraApiKey: string) {}

  async getReport(dateRange: IDateRange | null) {
    const dateRangeFilters = dateRange ? `&from=${dateRange.from}&to=${dateRange.to}` : ''
    const url = `https://gates.alegra.com/api/v1/invoices/sales-totals?groupBy=month${dateRangeFilters}`

    console.log(url)
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `${this.alegraApiKey}`,
          accept: 'application/json',
        },
      })

      return data
    } catch (error) {
      return { success: false, error: 'Error fetching sales report' }
    }
  }
}