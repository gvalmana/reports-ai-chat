import axios from 'axios'
import { IDateRange } from '../../interfaces/IReports'

export class PurchasesReport {
  constructor(private alegraApiKey: string) {}

  async getReport(dateRange: IDateRange | null) {
    const dateRangeFilters = dateRange ? `&fromDate=${dateRange.from}&toDate=${dateRange.to}` : ''
    const url = `https://gates.alegra.com/api/v1/reports/purchases-totals?${dateRangeFilters}`

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
      return { success: false, error: 'Error fetching purchases report' }
    }
  }
}
