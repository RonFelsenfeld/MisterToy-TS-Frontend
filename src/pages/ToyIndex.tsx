import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState, useAppDispatch } from '../store/store'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/slices/toy.slice'

import { ToyFilterBy, ToySortBy } from '../models/toy.model'
import { ReactMouseEvent } from '../models/system.model'

import ToyList from '../components/toy/ToyList'
import ToyFilter from '../components/toy/ToyFilter'
import ToySort from '../components/toy/ToySort'

const ToyIndex = () => {
  const toys = useSelector((state: RootState) => state.toyModule.toys)
  const filterBy = useSelector((state: RootState) => state.toyModule.filterBy)
  const sortBy = useSelector((state: RootState) => state.toyModule.sortBy)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadToys({ filterBy, sortBy }))
  }, [filterBy, sortBy])

  async function onRemoveToy(ev: ReactMouseEvent, toyId: string) {
    ev.preventDefault()

    try {
      await dispatch(removeToy(toyId))
    } catch (err) {
      console.error('Toy Index -> Had issues with removing toy:', err)
    }
  }

  function onSetFilterBy(filterBy: ToyFilterBy) {
    dispatch(setFilterBy(filterBy))
  }

  function onSetSortBy(sortBy: ToySortBy) {
    dispatch(setSortBy(sortBy))
  }

  return (
    <section className="toy-index">
      <div className="actions-container">
        <Link to="/toy/edit">
          <button className="btn-add-toy">Add toy</button>
        </Link>

        <h2 className="actions-title">Filter & sort your toys</h2>

        <div className="flex align-center justify-between">
          <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} />
        </div>
      </div>

      {toys.length ? (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      ) : (
        <div className="no-toys-msg">No toys found.</div>
      )}
    </section>
  )
}

export default ToyIndex
