import { Toy } from '../../models/toy.model'

interface ToyPreviewProps {
  toy: Toy
}

const ToyPreview = ({ toy }: ToyPreviewProps) => {
  return (
    <section className="toy-preview">
      <h1>{toy.name}</h1>
    </section>
  )
}

export default ToyPreview
