import { useState } from 'react'
import { InputChangeEvent } from '../../models/event.model'

const MsgForm = () => {
  const [msg, setMsg] = useState<string>('')

  function handleChange({ target }: InputChangeEvent) {
    let { value } = target
    setMsg(value)
  }

  return (
    <form className="msg-form flex">
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
