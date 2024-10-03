import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import { RootState, useAppDispatch } from '../../store/store'
import { hideUserMsg } from '../../store/slices/system.slice'

type TimeoutId = ReturnType<typeof setTimeout>

const UserMessage = () => {
  const message = useSelector((state: RootState) => state.systemModule.userMsg)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const timeoutIdRef = useRef<TimeoutId | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    resetTimeout()
    if (!message) return

    setIsOpen(true)
    timeoutIdRef.current = setTimeout(closeUserMessage, 3000)
  }, [message])

  function resetTimeout() {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
  }

  function closeUserMessage(timer = 500) {
    setIsOpen(false)
    setTimeout(() => dispatch(hideUserMsg()), timer)
  }

  let animationClasses = 'animate__animated animate__faster animate__slideInRight'
  if (!isOpen) animationClasses = animationClasses.replace('slideInRight', 'slideOutRight')
  return (
    message && (
      <section className={`user-message ${message.type} flex align-center ${animationClasses}`}>
        <p className="msg">{message.msg}</p>
        <button className="btn-close" onClick={() => closeUserMessage(1000)}>
          X
        </button>
      </section>
    )
  )
}

export default UserMessage
