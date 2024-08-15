import { Toy } from '../../models/toy.model'
import { utilService } from '../../services/util.service'
interface ToyPreviewProps {
  toy: Toy
}

const ToyPreview = ({ toy }: ToyPreviewProps) => {
  function getStockClass() {
    return toy.inStock ? 'in-stock' : 'out-stock'
  }

  const { name, price, inStock } = toy
  return (
    <section className="toy-preview flex column center">
      <h3 className="toy-name">{name}</h3>
      <p className="toy-price">{utilService.getFormattedCurrency(price)}</p>
      <p className={`toy-stock ${getStockClass()}`}>{inStock ? 'In' : 'Out of'} stock</p>
    </section>
  )
}

export default ToyPreview
