import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { toyService } from '../../services/toy.service'
import { GetToysResponse } from '../../models/server.model'
import { useNavigate } from 'react-router-dom'
import { Toy } from '../../models/toy.model'
import PricesChart from '../../components/charts/PricesChart'

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
        <h3 className="chart-title">Price by label</h3>

        <PricesChart toys={toys} />
      </div>
    </section>
  )
}

export default Dashboard
