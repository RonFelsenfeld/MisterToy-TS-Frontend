import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { toyService } from '../../services/toy.service'
import { useChartDataFormatter } from '../../customHooks/useChartDataFormatter'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const SalesChart = () => {
  const salesMap = toyService.getSalesPerMonthMap()
  const { props, chartData } = useChartDataFormatter(salesMap)

  const data = {
    labels: props,
    datasets: [
      {
        data: chartData,
        backgroundColor: '#d0d0d0',
        borderColor: ['#d0d0d0'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="chart sales-chart">
      <Line height="100px" data={data} options={options} />
    </div>
  )
}

export default SalesChart
