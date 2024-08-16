import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../store/store'
import { loadToys, setFilterBy } from '../store/slices/toy.slice'
import { ToyFilterBy } from '../models/toy.model'

import ToyList from '../components/toy/ToyList'
import ToyFilter from '../components/toy/ToyFilter'

const ToyIndex = () => {
  const toys = useSelector((state: RootState) => state.toyModule.toys)
  const filterBy = useSelector((state: RootState) => state.toyModule.filterBy)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadToys(filterBy))
  }, [filterBy])

  function onSetFilterBy(filterBy: ToyFilterBy) {
    dispatch(setFilterBy(filterBy))
  }

  return (
    <section className="toy-index">
      <div className="actions-container">
        <h2 className="actions-title">Filter & sort your toys</h2>
        <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </div>

      {toys.length ? <ToyList toys={toys} /> : <div className="no-toys-msg">No toys found.</div>}
    </section>
  )
}

export default ToyIndex
