import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { ToyFieldValues, ToyFilterBy } from '../../models/toy.model'
import LabelMultiSelect from '../general/LabelMultiSelect'

type InputEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>
interface ToyFilterProps {
  filterBy: ToyFilterBy
  onSetFilterBy: (filterBy: ToyFilterBy) => void
}

const ToyFilter = ({ filterBy, onSetFilterBy }: ToyFilterProps) => {
  const [filterByToEdit, setFilterByToEdit] = useState<ToyFilterBy>(filterBy)
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilterBy, 300))
  console.log(`filterByToEdit`, filterByToEdit)

  useEffect(() => {
    debounceOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }: InputEvent) {
    let { value: rawValue, name: field, type } = target
    let value: ToyFieldValues = rawValue

    if (type === 'number') value = +value
    if (type === 'select-one') {
      if (value === 'inStock') value = true
      else if (value === 'outOfStock') value = false
      else value = null
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onToggleLabel(label: string) {
    let updatedLabels: string[]

    if (filterByToEdit.labels.includes(label)) {
      updatedLabels = filterByToEdit.labels.filter(l => l !== label)
    } else {
      updatedLabels = [...filterByToEdit.labels, label]
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: updatedLabels }))
  }

  const { name, maxPrice } = filterByToEdit
  return (
    <section className="toy-filter">
      <form className="flex">
        <input
          type="text"
          id="name"
          placeholder="By name"
          name="name"
          value={name}
          onChange={ev => handleChange(ev)}
        />

        <input
          type="number"
          id="maxPrice"
          placeholder="By max price"
          name="maxPrice"
          value={maxPrice || ''}
          onChange={handleChange}
        />

        <LabelMultiSelect onToggleLabel={onToggleLabel} selectedLabels={filterByToEdit.labels} />

        <select name="inStock" id="inStock" onChange={handleChange}>
          <option value="all">All</option>
          <option value="inStock">In stock</option>
          <option value="outOfStock">Out of stock</option>
        </select>
      </form>
    </section>
  )
}

export default ToyFilter
