import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'

import { RemoveToyFn, Toy } from '../../models/toy.model'
import { ReactMouseEvent } from '../../models/event.model'
interface ToyPreviewProps {
  toy: Toy
  onRemoveToy: RemoveToyFn
}

const ToyPreview = ({ toy, onRemoveToy }: ToyPreviewProps) => {
  const navigate = useNavigate()

  function onEditToy(ev: ReactMouseEvent) {
    ev.preventDefault()
    navigate(`/toy/edit/${toy._id}`)
  }

  function getStockClass() {
    return toy.inStock ? 'in-stock' : 'out-stock'
  }

  const { name, price, inStock } = toy
  return (
    <section className="toy-preview flex column center">
      <h3 className="toy-name">{name}</h3>
      <p className="toy-price">{utilService.getFormattedCurrency(price)}</p>
      <p className={`toy-stock ${getStockClass()}`}>{inStock ? 'In' : 'Out of'} stock</p>

      <div className="toy-actions-container flex">
        <button className="btn-action" onClick={onEditToy}>
          Edit
        </button>
        <button className="btn-action remove" onClick={ev => onRemoveToy(ev, toy._id)}>
          Remove
        </button>
      </div>
    </section>
  )
}

export default ToyPreview
