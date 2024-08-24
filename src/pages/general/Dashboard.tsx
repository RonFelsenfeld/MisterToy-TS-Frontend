import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { toyService } from '../../services/toy.service'
import { GetToysResponse } from '../../models/server.model'

const Dashboard = () => {
  const { data, error, loading } = useQuery<GetToysResponse>(toyService.query)

  useEffect(() => {
    console.log(`data`, data)
    console.log(`error`, error?.message)
    console.log(`loading`, loading)
  }, [data, error, loading])

  return <section className="dashboard">Hello from Dashboard</section>
}

export default Dashboard
