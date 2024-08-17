import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.local.service'
import { Toy, ToyFieldValues } from '../models/toy.model'

type InputEvent = ChangeEvent<HTMLInputElement>
type FormSubmitEvent = React.FormEvent<HTMLFormElement>
type ToyToEdit = Partial<Toy>

const ToyEdit = () => {
  const [toyToEdit, setToyToEdit] = useState<ToyToEdit>(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId!)
      setToyToEdit(toy)
    } catch (err) {
      console.log('Toy Edit -> Had issues with loading toy:', err)
      navigate('/')
    }
  }

  function handleChange({ target }: InputEvent) {
    let { value: rawValue, name: field, type } = target
    let value: ToyFieldValues = rawValue

    if (type === 'number') value = +value
    if (type === 'checkbox') value = target.checked

    setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
  }

  async function onSaveToy(ev: FormSubmitEvent) {
    ev.preventDefault()

    try {
      await toyService.save(toyToEdit as Toy)
      navigate('/')
    } catch (err) {
      console.log('Toy Edit -> Had issues with saving toy:', err)
    }
  }

  const { _id, name, price, inStock } = toyToEdit
  return (
    <section className="toy-edit flex column center">
      <h2 className="edit-heading">{_id ? 'Edit' : 'Add'} toy</h2>
      <form onSubmit={onSaveToy} className="flex column align-center">
        <div className="inputs-container flex column align-center">
          <div className="input-container flex align-center justify-between">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter new name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container flex align-center justify-between">
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              id="price"
              min={1}
              step={0.01}
              placeholder="Enter new price"
              value={price || ''}
              onChange={handleChange}
            />
          </div>

          <div className="input-container stock flex align-center">
            <label htmlFor="inStock">In stock: </label>
            <input
              type="checkbox"
              name="inStock"
              id="inStock"
              checked={inStock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions-container flex justify-between">
          <Link to="/">
            <button className="btn btn-cancel">Cancel</button>
          </Link>

          <button className="btn btn-save">{_id ? 'Save' : 'Add'}</button>
        </div>
      </form>
    </section>
  )
}

export default ToyEdit
