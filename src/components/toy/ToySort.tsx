import { useInternationalization } from '../../customHooks/useInternationalization'
import { ToySortBy } from '../../models/toy.model'
import { InputChangeEvent, InputType } from '../../models/event.model'

interface ToySortProps {
  sortBy: ToySortBy
  onSetSortBy: (sortBy: ToySortBy) => void
}

const ToySort = ({ sortBy, onSetSortBy }: ToySortProps) => {
  const { getTranslation } = useInternationalization()

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
        name
        <option value="name">{getTranslation('name')}</option>
        <option value="price">{getTranslation('price')}</option>
        <option value="createdAt">{getTranslation('arrival')}</option>
      </select>

      <div className="dir-container flex column center">
        <input type="checkbox" name="sort-dir" id="sort-dir" onChange={handleChange} />
        <label htmlFor="sort-dir">{getTranslation('descending')}</label>
      </div>
    </section>
  )
}

export default ToySort
