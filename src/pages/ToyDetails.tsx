import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'

import { Toy } from '../models/toy.model'
import { GetToyByIdResponse } from '../models/server.model'

const ToyDetails = () => {
  const [toy, setToy] = useState<Toy | null>(null)
  const navigate = useNavigate()
  const { toyId } = useParams()

  const { data, error } = useQuery<GetToyByIdResponse>(toyService.getById, {
    variables: { toyId },
  })

  useEffect(() => {
    if (data) setToy(data.toy)
    if (error) handleError(error)
  }, [data, error])

  function handleError(err: Error) {
    console.error('Toy Details -> Had issues with fetching toy:', err)
    navigate('/')
  }

  function capitalizeLabel(label: string) {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  function getStockClass(inStock: boolean) {
    return inStock ? 'in-stock' : 'out-stock'
  }

  if (!toy) return <h3 className="loading-toy-msg">Loading toy details...</h3>

  const { name, price, inStock, labels } = toy
  return (
    <section className="toy-details">
      <Link to={`/`}>
        <button className="btn-back">Back to shop</button>
      </Link>

      <h2 className="toy-name">{name}</h2>
      <div className="price-stock-container flex">
        <h3 className="toy-price">{utilService.getFormattedCurrency(price)} </h3>
        <span className={`toy-stock ${getStockClass(inStock)}`}>
          {inStock ? 'In ' : 'Out of '}stock
        </span>
      </div>

      <ul className="label-list clean-list flex">
        {labels.map(label => (
          <li key={Math.random() + label} className="label">
            {capitalizeLabel(label)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ToyDetails
