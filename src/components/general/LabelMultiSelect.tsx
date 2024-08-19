import { useRef, useState } from 'react'
import { toyService } from '../../services/toy.service'
import { useClickOutside } from '../../customHooks/useClickOutside'

interface LabelMultiSelectProps {
  onToggleLabel: (label: string) => void
  selectedLabels: string[]
}

const LabelMultiSelect = ({ onToggleLabel, selectedLabels }: LabelMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const labels = toyService.getLabels()

  useClickOutside(dropdownRef, () => setIsOpen(false))

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function capitalizeLabel(label: string) {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  function isLabelSelected(label: string) {
    return selectedLabels.includes(label.toLowerCase())
  }

  return (
    <section
      className={`label-multi-select flex center ${selectedLabels.length && 'label-selected'}`}
    >
      <h3 className="dropdown-title" onClick={toggleDropdown}>
        Select Labels
      </h3>

      {isOpen && (
        <ul className="labels-dropdown clean-list" ref={dropdownRef}>
          {labels.map(label => (
            <li
              key={Math.random() + label}
              value={label.toLowerCase()}
              className={`dropdown-item ${isLabelSelected(label) && 'selected'}`}
              onClick={() => onToggleLabel(label)}
            >
              {capitalizeLabel(label)}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LabelMultiSelect
