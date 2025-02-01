export interface DateRange {
  from: string
  to: string
}

export interface ReportIntent {
  type: string
  dateRange?: DateRange
  // Otros parámetros que puedan ser necesarios para otros tipos de reportes
}

export interface SalesReport {
  date: string
  total: number
  // Otros campos del reporte de ventas
}

export interface ReportResponse<T> {
  success: boolean
  data?: T
  error?: string
}
