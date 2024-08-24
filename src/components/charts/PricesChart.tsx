import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { Toy } from '../../models/toy.model'
import { toyService } from '../../services/toy.service'
import { utilService } from '../../services/util.service'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PricesChartProps {
  toys: Toy[]
}

const PricesChart = ({ toys }: PricesChartProps) => {
  const pricesPerLabelMap = toyService.getPricesPerLabelMap(toys)
  let prices: number[] = []
  let labels: string[] = []

  // ! Making sure that the arrays are orderly sync
  for (const [label, price] of Object.entries(pricesPerLabelMap)) {
    prices.push(price)
    labels.push(label.charAt(0).toUpperCase() + label.slice(1))
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Price by label',
        data: prices,
        backgroundColor: prices.map(_ => utilService.getRandomColor()),
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
    <section className="PricesChart">
      <Pie height="450px" data={data} options={options} />
    </section>
  )
}

export default PricesChart
