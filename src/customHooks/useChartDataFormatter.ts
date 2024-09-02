import { getTranslatedLabel } from '../services/i18n.service'

interface ChartData {
  [prop: string]: number
}

interface formattedData {
  props: string[]
  chartData: number[]
}

export const useChartDataFormatter = (data: ChartData): formattedData => {
  let props: string[] = []
  let chartData: number[] = []

  // ! Making sure that the arrays are orderly sync
  for (const [label, price] of Object.entries(data)) {
    props.push(getTranslatedLabel(label))
    chartData.push(price)
  }

  return { props, chartData }
}
