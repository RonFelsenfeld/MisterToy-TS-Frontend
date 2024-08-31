import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { toyService } from '../../services/toy.service'
import { GetToysResponse } from '../../models/server.model'
import { Toy } from '../../models/toy.model'

import PricesChart from '../../components/charts/PricesChart'
import InventoryChart from '../../components/charts/InventoryChart'
import SalesChart from '../../components/charts/SalesChart'

const Dashboard = () => {
  const [toys, setToys] = useState<Toy[] | null>(null)
  const { data, error } = useQuery<GetToysResponse>(toyService.query)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) setToys(data.toys)
    if (error) handleFetchingError()
  }, [data, error])

  function handleFetchingError() {
    console.error('Dashboard -> Had issues with fetching toys:', error)
    navigate('/toy')
  }

  if (!toys) return <div className="loading-msg">Loading...</div>
  return (
    <section className="dashboard">
      <h2 className="dashboard-heading">Statistics</h2>

      <div className="charts-container flex column align-center">
        <figure className="chart-container flex column align-center">
          <figcaption className="chart-title">Price by label</figcaption>
          <PricesChart toys={toys} />
        </figure>

        <figure className="chart-container flex column align-center">
          <figcaption className="chart-title">In stock by label (%)</figcaption>
          <InventoryChart toys={toys} />
        </figure>

        <figure className="chart-container flex column align-center">
          <figcaption className="chart-title">Sales</figcaption>
          <SalesChart />
        </figure>
      </div>
    </section>
  )
}

export default Dashboard
