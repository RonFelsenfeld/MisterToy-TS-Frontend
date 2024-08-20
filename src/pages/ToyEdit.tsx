import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { toyService } from '../services/toy.service'
import { useAppDispatch } from '../store/store'
import { saveToy } from '../store/slices/toy.slice'

import { Toy, ToyFieldValues } from '../models/toy.model'
import { FormSubmitEvent, InputChangeEvent, InputType } from '../models/system.model'
import { GetToyByIdResponse } from '../models/server.model'

type ToyToEdit = Partial<Toy>

const ToyEdit = () => {
  const [toyToEdit, setToyToEdit] = useState<ToyToEdit>(toyService.getEmptyToy())
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toyId } = useParams()

  const { data, error } = useQuery<GetToyByIdResponse>(toyService.getById, {
    variables: { toyId },
    skip: !toyId, // ! If there's no toyId, don't run the query
  })

  useEffect(() => {
    if (data) setToyToEdit(data.toy)
    if (error) handleError(error)
  }, [data, error])

  function handleError(err: Error) {
    console.error('Toy Details -> Had issues with fetching toy:', err)
    navigate('/toy')
  }

  function handleChange({ target }: InputChangeEvent) {
    let { value: rawValue, name: field, type } = target
    let value: ToyFieldValues = rawValue

    if (type === InputType.Number) value = +value
    if (type === InputType.Checkbox) value = (target as HTMLInputElement).checked

    setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
  }

  async function onSaveToy(ev: FormSubmitEvent) {
    ev.preventDefault()

    try {
      await dispatch(saveToy(toyToEdit as Toy))
      navigate('/toy')
    } catch (err) {
      console.error('Toy Edit -> Had issues with saving toy:', err)
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
              required
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
              required
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
          <Link to="/toy">
            <button className="btn btn-cancel">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-save">
            {_id ? 'Save' : 'Add'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ToyEdit
