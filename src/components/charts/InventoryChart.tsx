import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { toyService } from '../../services/toy.service'
import { utilService } from '../../services/util.service'
import { useChartDataFormatter } from '../../customHooks/useChartDataFormatter'
import { Toy } from '../../models/toy.model'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface InventoryChartProps {
  toys: Toy[]
}

const InventoryChart = ({ toys }: InventoryChartProps) => {
  const inStockPercentagePerLabel = toyService.getInStockPercentagesPerLabelMap(toys)
  const { props, chartData } = useChartDataFormatter(inStockPercentagePerLabel)

  const data = {
    labels: props,
    datasets: [
      {
        label: 'In-stock Percentage',
        data: chartData,
        backgroundColor: props.map(_ => utilService.getRandomColor()),
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
        display: false,
      },
    },
  }

  return (
    <section className="inventory-chart">
      <Bar options={options} data={data} />
    </section>
  )
}

export default InventoryChart
