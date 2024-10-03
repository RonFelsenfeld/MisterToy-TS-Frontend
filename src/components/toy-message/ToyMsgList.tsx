import { ToyMsg } from '../../models/toy.model'
import ToyMsgPreview from './ToyMsgPreview'

export interface ToyMsgListProps {
  msgs: ToyMsg[]
  onRemoveMsg: (msgId: string) => void
}

const ToyMsgList = ({ msgs, onRemoveMsg }: ToyMsgListProps) => {
  return (
    <ul className="toy-msg-list clean-list">
      {msgs.map(msg => (
        <li key={msg.id}>
          <ToyMsgPreview msg={msg} onRemoveMsg={onRemoveMsg} />
        </li>
      ))}
    </ul>
  )
}

export default ToyMsgList
