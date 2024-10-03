import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import { utilService } from '../../services/util.service'
import { toyService } from '../../services/toy.service'
import { getTranslatedLabel } from '../../services/i18n.service'

import { useAppDispatch } from '../../store/store'
import { showErrorMessage, showSuccessMessage } from '../../store/slices/system.slice'

import { useInternationalization } from '../../customHooks/useInternationalization'
import { useAuthorization } from '../../customHooks/useAuthorization'

import { Toy } from '../../models/toy.model'
import { AddToyMsgResponse, GetToyByIdResponse } from '../../models/server.model'

import ToyMsgList, { ToyMsgListProps } from '../../components/toy-message/ToyMsgList'
import MsgForm from '../../components/toy-message/MsgForm'

const ToyDetails = () => {
  const [toy, setToy] = useState<Toy | null>(null)
  const { toyId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isUserLoggedIn } = useAuthorization()
  const { getTranslation } = useInternationalization()

  const { data, error } = useQuery<GetToyByIdResponse>(toyService.getById, {
    variables: { toyId },
    fetchPolicy: 'network-only',
  })

  const [addToyMsg, { data: msgData, error: addMsgError }] = useMutation<AddToyMsgResponse>(
    toyService.addToyMsg
  )

  const [removeToyMsg, { error: removeMsgError }] = useMutation(toyService.removeToyMsg)

  useEffect(() => {
    if (data) setToy(data.toy)
    if (error) handleError(error, 'fetching toy', true)
  }, [data, error])

  useEffect(() => {
    if (msgData) handleNewMsg(msgData)
    if (addMsgError) handleError(addMsgError, 'adding msg')
    if (removeMsgError) handleError(removeMsgError, 'removing msg')
  }, [msgData, addMsgError, removeMsgError])

  function handleNewMsg(msgData: AddToyMsgResponse) {
    if (!toy) return
    const { addToyMsg } = msgData
    const updatedMsgs = [...toy.msgs, addToyMsg]
    setToy(prevToy => ({ ...prevToy!, msgs: updatedMsgs }))
  }

  function handleError(err: Error, msg: string, isNavigateBack = false) {
    console.error(`Toy Details -> Had issues with ${msg}:`, err.message)
    if (isNavigateBack) navigate('/toy')
  }

  async function onAddMsg(msg: string) {
    try {
      await addToyMsg({ variables: { toyId, msg } })
      dispatch(showSuccessMessage('Message added successfully'))
    } catch (err) {
      dispatch(showErrorMessage(`Could not add message, please try again later.`))
    }
  }

  async function onRemoveMsg(msgId: string) {
    try {
      await removeToyMsg({ variables: { toyId, msgId } })
      setToy(prevToy => ({
        ...prevToy!,
        msgs: [...prevToy!.msgs.filter(m => m.id !== msgId)],
      }))
      dispatch(showSuccessMessage('Message removed successfully'))
    } catch (err) {
      dispatch(showErrorMessage(`Could not remove message, please try again later.`))
    }
  }

  if (!toy) return <h3 className="loading-toy-msg">{getTranslation('loading-toy-msg')}...</h3>

  const { name, price, inStock, labels, msgs } = toy
  const inStockStr = inStock ? 'in-stock' : 'out-of-stock'

  return (
    <section className="toy-details">
      <Link to="/toy">
        <button className="btn-back">{getTranslation('back-to-shop')}</button>
      </Link>

      {isUserLoggedIn() ? (
        <MsgForm onAddMsg={onAddMsg} />
      ) : (
        <p className="login-msg">
          <Link to="/login">Login </Link>
          to leave messages.
        </p>
      )}

      <div className="details-content">
        <h2 className="toy-name">{name}</h2>
        <div className="price-stock-container flex">
          <h3 className="toy-price">{utilService.getFormattedCurrency(price)} </h3>
          <span className={`toy-stock ${inStockStr}`}>{getTranslation(inStockStr)}</span>
        </div>

        <ul className="label-list clean-list flex">
          {labels.map(label => (
            <li key={Math.random() + label} className="label">
              {getTranslatedLabel(label)}
            </li>
          ))}
        </ul>
      </div>

      <_MessageBox msgs={msgs} onRemoveMsg={onRemoveMsg} />
    </section>
  )
}

export default ToyDetails

////////////////////////////////////////////////////

const _MessageBox = ({ msgs, onRemoveMsg }: ToyMsgListProps) => {
  const { getTranslation } = useInternationalization()

  if (msgs.length) {
    return (
      <div className="msgs-container flex column">
        <h3 className="msgs-heading">{getTranslation('toy-msgs-heading')}</h3>
        <ToyMsgList msgs={msgs} onRemoveMsg={onRemoveMsg} />
      </div>
    )
  } else {
    return <p className="no-msgs">There are no messages about this toy.</p>
  }
}
