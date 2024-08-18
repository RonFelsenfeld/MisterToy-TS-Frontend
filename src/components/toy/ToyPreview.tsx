import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { Toy } from '../../models/toy.model'
interface ToyPreviewProps {
  toy: Toy
}

type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const ToyPreview = ({ toy }: ToyPreviewProps) => {
  const navigate = useNavigate()

  function onEditToyClick(ev: ReactMouseEvent) {
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

      <button className="btn-action" onClick={onEditToyClick}>
        Edit
      </button>
    </section>
  )
}

export default ToyPreview
