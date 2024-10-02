import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { utilService } from '../../services/util.service'
import { toyService } from '../../services/toy.service'
import { getTranslatedLabel } from '../../services/i18n.service'

import { useInternationalization } from '../../customHooks/useInternationalization'
import { Toy } from '../../models/toy.model'

import { GetToyByIdResponse } from '../../models/server.model'
import ToyMsgList from '../../components/toy/ToyMsgList'

const ToyDetails = () => {
  const [toy, setToy] = useState<Toy | null>(null)
  const navigate = useNavigate()
  const { toyId } = useParams()
  const { getTranslation } = useInternationalization()

  const { data, error } = useQuery<GetToyByIdResponse>(toyService.getById, {
    variables: { toyId },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data) setToy(data.toy)
    if (error) handleError(error)
  }, [data, error])

  function handleError(err: Error) {
    console.error('Toy Details -> Had issues with fetching toy:', err.message)
    navigate('/toy')
  }

  if (!toy) return <h3 className="loading-toy-msg">{getTranslation('loading-toy-msg')}...</h3>

  const { name, price, inStock, labels, msgs } = toy
  const inStockStr = inStock ? 'in-stock' : 'out-of-stock'

  return (
    <section className="toy-details">
      <Link to="/toy">
        <button className="btn-back">{getTranslation('back-to-shop')}</button>
      </Link>

      <div className="details-content">
        <h2 className="toy-name">{name}</h2>
        <div className="price-stock-container flex">
          <h3 className="toy-price">{utilService.getFormattedCurrency(price)} </h3>
          <span className={`toy-stock ${inStockStr}`}>{getTranslation(inStockStr)}</span>
        </div>

        <ul className="label-list clean-list flex">
          {labels.map(label => (
            <li key={Math.random() + label} className="label">
              {getTranslatedLabel(label)}
            </li>
          ))}
        </ul>
      </div>

      {!!msgs.length && (
        <div className="msgs-container flex column">
          <h3 className="msgs-heading">{getTranslation('toy-msgs-heading')}</h3>
          <ToyMsgList msgs={msgs} />
        </div>
      )}
    </section>
  )
}

export default ToyDetails
