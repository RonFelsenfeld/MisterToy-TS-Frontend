import { useNavigate } from 'react-router-dom'

import { utilService } from '../../services/util.service'
import { useInternationalization } from '../../customHooks/useInternationalization'
import { useAuthorization } from '../../customHooks/useAuthorization'

import { RemoveToyFn, Toy } from '../../models/toy.model'
import { ReactMouseEvent } from '../../models/event.model'
interface ToyPreviewProps {
  toy: Toy
  onRemoveToy: RemoveToyFn
}

const ToyPreview = ({ toy, onRemoveToy }: ToyPreviewProps) => {
  const navigate = useNavigate()
  const { getTranslation } = useInternationalization()
  const { isAuthorized } = useAuthorization()

  function onEditToy(ev: ReactMouseEvent) {
    ev.preventDefault()
    navigate(`/toy/edit/${toy._id}`)
  }

  function getStockClass() {
    return toy.inStock ? 'in-stock' : 'out-stock'
  }

  function getStockMsg() {
    return inStock ? getTranslation('in-stock') : getTranslation('out-of-stock')
  }

  const { name, price, inStock } = toy
  return (
    <section className="toy-preview flex column center">
      <h3 className="toy-name">{name}</h3>
      <p className="toy-price">{utilService.getFormattedCurrency(price)}</p>
      <p className={`toy-stock ${getStockClass()}`}>{getStockMsg()}</p>

      {isAuthorized() && (
        <div className="toy-actions-container flex">
          <button className="btn-action" onClick={onEditToy}>
            {getTranslation('edit')}
          </button>
          <button className="btn-action remove" onClick={ev => onRemoveToy(ev, toy._id)}>
            {getTranslation('remove')}
          </button>
        </div>
      )}
    </section>
  )
}

export default ToyPreview
