import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.local.service'
import { Toy } from '../models/toy.model'

const ToyDetails = () => {
  const [toy, setToy] = useState<Toy | null>(null)
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId!)
      setToy(toy)
    } catch (err) {
      console.log('Toy Details -> Had issues with loading toy :', err)
    }
  }

  function getStockClass(inStock: boolean) {
    return inStock ? 'in-stock' : 'out-stock'
  }

  if (!toy) return <h3 className="loading-toy-msg">Loading toy details...</h3>

  const { name, price, inStock } = toy
  return (
    <section className="toy-details">
      <Link to={`/`}>
        <button className="btn-back">Back to shop</button>
      </Link>

      <h2 className="toy-name">{name}</h2>
      <h3 className="toy-price">{utilService.getFormattedCurrency(price)}</h3>
      <p className={`toy-stock ${getStockClass(inStock)}`}>{inStock ? 'In ' : 'Out of '}stock</p>
    </section>
  )
}

export default ToyDetails
