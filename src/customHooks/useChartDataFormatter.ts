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
    props.push(label.charAt(0).toUpperCase() + label.slice(1))
    chartData.push(price)
  }

  return { props, chartData }
}
