import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service'
import { RootState, useAppDispatch } from '../../store/store'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../../store/slices/toy.slice'

import { useInternationalization } from '../../customHooks/useInternationalization'
import { useAuthorization } from '../../customHooks/useAuthorization'

import { ToyFilterBy, ToySortBy } from '../../models/toy.model'
import { ReactMouseEvent } from '../../models/event.model'

import ToyList from '../../components/toy/ToyList'
import ToyFilter from '../../components/toy/ToyFilter'
import ToySort from '../../components/toy/ToySort'

const ToyIndex = () => {
  const toys = useSelector((state: RootState) => state.toyModule.toys)
  const filterBy = useSelector((state: RootState) => state.toyModule.filterBy)
  const sortBy = useSelector((state: RootState) => state.toyModule.sortBy)
  const user = useSelector((state: RootState) => state.systemModule.loggedInUser)

  const dispatch = useAppDispatch()
  const { getTranslation } = useInternationalization()
  const { isUserLoggedIn, isAuthorized } = useAuthorization()

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

  function greetUser() {
    return `${utilService.greetBasedOnHour()}, ${user!.fullName} :)`
  }

  return (
    <section className="toy-index">
      {isUserLoggedIn() && <h2 className="user-greet">{greetUser()}</h2>}

      <div className="actions-container">
        {isAuthorized() && (
          <Link to="/toy/edit">
            <button className="btn-add-toy">{getTranslation('add-toy')}</button>
          </Link>
        )}

        <h2 className="actions-title">{getTranslation('filter-sort')}</h2>

        <div className="flex align-center justify-between">
          <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} />
        </div>
      </div>

      {!toys && <p className="loading-msg">{getTranslation('loading-toys-msg')}...</p>}
      {toys && !!toys.length && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      {toys && !toys.length && <div className="loading-msg">{getTranslation('no-toys-msg')}</div>}
    </section>
  )
}

export default ToyIndex
