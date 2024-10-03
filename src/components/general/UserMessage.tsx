import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { useEffect, useRef, useState } from 'react'
import { hideUserMsg } from '../../store/slices/system.slice'

type TimeoutId = ReturnType<typeof setTimeout>

const UserMessage = () => {
  const message = useSelector((state: RootState) => state.systemModule.userMsg)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const timeoutIdRef = useRef<TimeoutId | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!message) return
    setIsOpen(true)

    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = setTimeout(closeUserMessage, 3000)
  }, [message])

  function closeUserMessage() {
    setIsOpen(false)
    setTimeout(() => dispatch(hideUserMsg()), 500)
  }

  let animationClasses = 'animate__animated animate__faster animate__slideInRight'
  if (!isOpen) animationClasses = animationClasses.replace('slideInRight', 'slideOutRight')
  return (
    message && (
      <section className={`user-message ${message.type} flex align-center ${animationClasses}`}>
        <p className="msg">{message.msg}</p>
        <button className="btn-close">X</button>
      </section>
    )
  )
}

export default UserMessage
