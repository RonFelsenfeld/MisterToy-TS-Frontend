import { Toy } from '../../models/toy.model'
import ToyPreview from './ToyPreview'

interface ToyListProps {
  toys: Toy[]
}

const ToyList = ({ toys }: ToyListProps) => {
  return (
    <ul className="toy-list clean-list">
      {toys.map(toy => (
        <li key={toy._id}>
          <ToyPreview toy={toy} />
        </li>
      ))}
    </ul>
  )
}

export default ToyList
