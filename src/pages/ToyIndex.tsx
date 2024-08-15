import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../store/store'
import { loadToys } from '../store/slices/toy.slice'

import ToyList from '../components/toy/ToyList'

const ToyIndex = () => {
  const toys = useSelector((state: RootState) => state.toyModule.toys)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadToys())
  }, [])

  return <section className="toy-index">{<ToyList toys={toys} />}</section>
}

export default ToyIndex
