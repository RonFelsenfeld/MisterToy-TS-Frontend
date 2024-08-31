import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { toyService } from '../../services/toy.service'
import { utilService } from '../../services/util.service'
import { useChartDataFormatter } from '../../customHooks/useChartDataFormatter'
import { Toy } from '../../models/toy.model'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PricesChartProps {
  toys: Toy[]
}

const PricesChart = ({ toys }: PricesChartProps) => {
  const pricesPerLabelMap = toyService.getPricesPerLabelMap(toys)
  const { props, chartData } = useChartDataFormatter(pricesPerLabelMap)

  const data = {
    labels: props,
    datasets: [
      {
        label: 'Price by label',
        data: chartData,
        backgroundColor: chartData.map(_ => utilService.getRandomColor()),
        borderColor: ['#d0d0d0'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 10,
          padding: 20,
        },
      },
    },
  }
  return (
    <section className="prices-chart">
      <Pie height="450px" data={data} options={options} />
    </section>
  )
}

export default PricesChart
