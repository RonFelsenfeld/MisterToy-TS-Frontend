import { Link } from 'react-router-dom'
import { RemoveToyFn, Toy } from '../../models/toy.model'
import ToyPreview from './ToyPreview'

interface ToyListProps {
  toys: Toy[]
  onRemoveToy: RemoveToyFn
}

const ToyList = ({ toys, onRemoveToy }: ToyListProps) => {
  return (
    <ul className="toy-list clean-list">
      {toys.map(toy => (
        <li key={toy._id}>
          <Link to={`/toy/${toy._id}`}>
            <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ToyList
