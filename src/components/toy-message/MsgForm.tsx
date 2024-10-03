import { useState } from 'react'
import { FormSubmitEvent, InputChangeEvent } from '../../models/event.model'

interface MsgFormProps {
  onAddMsg: (msg: string) => Promise<void>
}

const MsgForm = ({ onAddMsg }: MsgFormProps) => {
  const [msg, setMsg] = useState<string>('')

  function handleChange({ target }: InputChangeEvent) {
    let { value } = target
    setMsg(value)
  }

  async function onSubmitMsg(ev: FormSubmitEvent) {
    ev.preventDefault()

    try {
      await onAddMsg(msg)
      setMsg('')
    } catch (err) {
      console.error('Had issues with adding message:', err)
    }
  }

  return (
    <form className="msg-form flex" onSubmit={onSubmitMsg}>
      <input
        type="text"
        className="msg-input"
        placeholder="Your message"
        value={msg}
        onChange={handleChange}
        required
      />

      <button className="btn-submit">Send</button>
    </form>
  )
}

export default MsgForm
