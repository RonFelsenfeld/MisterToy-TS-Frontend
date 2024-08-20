import { ToySortBy } from '../../models/toy.model'
import { InputChangeEvent, InputType } from '../../models/event.model'

interface ToySortProps {
  sortBy: ToySortBy
  onSetSortBy: (sortBy: ToySortBy) => void
}

const ToySort = ({ sortBy, onSetSortBy }: ToySortProps) => {
  function handleChange({ target }: InputChangeEvent) {
    let { value, type } = target

    if (type === InputType.Select) {
      const currDir = Object.values(sortBy)[0]
      onSetSortBy({ [value]: currDir || 1 })
    }

    if (type === InputType.Checkbox) {
      const currSortCriteria = Object.keys(sortBy)[0]
      const newDir = sortBy[currSortCriteria]! * -1
      onSetSortBy({ [currSortCriteria]: newDir as 1 | -1 })
    }
  }

  return (
    <section className="toy-sort flex">
      <select name="sort-select" id="sort-select" onChange={handleChange}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Arrival time</option>
      </select>

      <div className="dir-container flex column center">
        <input type="checkbox" name="sort-dir" id="sort-dir" onChange={handleChange} />
        <label htmlFor="sort-dir">Descending</label>
      </div>
    </section>
  )
}

export default ToySort
