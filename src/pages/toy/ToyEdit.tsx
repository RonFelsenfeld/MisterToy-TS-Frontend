import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { toyService } from '../../services/toy.service'
import { useInternationalization } from '../../customHooks/useInternationalization'

import { useAppDispatch } from '../../store/store'
import { saveToy } from '../../store/slices/toy.slice'
import { showErrorMessage, showSuccessMessage } from '../../store/slices/system.slice'

import { NewToy, Toy, ToyFieldValues } from '../../models/toy.model'
import { FormSubmitEvent, InputChangeEvent, InputType } from '../../models/event.model'
import { GetToyByIdResponse } from '../../models/server.model'

type ToyToEdit = Toy | NewToy

const ToyEdit = () => {
  const [toyToEdit, setToyToEdit] = useState<ToyToEdit>(toyService.getNewToy())

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toyId } = useParams()

  const { getTranslation } = useInternationalization()

  const { data, error } = useQuery<GetToyByIdResponse>(toyService.getById, {
    variables: { toyId },
    skip: !toyId, // ! If there's no toyId, don't run the query
    fetchPolicy: 'network-only', // ! Always fetch from database
  })

  useEffect(() => {
    if (data) setToyToEdit(data.toy)
    if (error) handleError(error)
  }, [data, error])

  function handleError(err: Error) {
    console.error('Toy Details -> Had issues with fetching toy:', err.message)
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
      await dispatch(saveToy(toyToEdit as Toy)).unwrap()
      dispatch(showSuccessMessage(`Toy ${toyId ? 'updated' : 'added'} successfully`))
      navigate('/toy')
    } catch (err) {
      dispatch(showErrorMessage(`Could not save toy, please try again later.`))
    }
  }

  function getTitle() {
    const translatedAction = getTranslation(toyId ? 'edit' : 'add')
    return `${translatedAction} ${getTranslation('toy')}`
  }

  const { name, price, inStock } = toyToEdit
  const stockTranslatedStr = `${getTranslation('in-stock')} / ${getTranslation('out-of-stock')}`

  return (
    <section className="toy-edit flex column center">
      <h2 className="edit-heading">{getTitle()}</h2>
      <form onSubmit={onSaveToy} className="flex column align-center">
        <div className="inputs-container flex column align-center">
          <div className="input-container flex align-center justify-between">
            <label htmlFor="name">{getTranslation('name')}:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={getTranslation('enter-name')}
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container flex align-center justify-between">
            <label htmlFor="price">{getTranslation('price')}:</label>
            <input
              type="number"
              name="price"
              id="price"
              min={1}
              step={0.01}
              placeholder={getTranslation('enter-price')}
              value={price || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container stock flex align-center">
            <label htmlFor="inStock">{stockTranslatedStr}</label>
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
            <button type="button" className="btn btn-cancel">
              {getTranslation('cancel')}
            </button>
          </Link>

          <button className="btn btn-save">{getTranslation(toyId ? 'save' : 'add')}</button>
        </div>
      </form>
    </section>
  )
}

export default ToyEdit
