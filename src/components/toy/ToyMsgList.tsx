import { ToyMsg } from '../../models/toy.model'
import ToyMsgPreview from './ToyMsgPreview'

interface ToyMsgListProps {
  msgs: ToyMsg[]
}

const ToyMsgList = ({ msgs }: ToyMsgListProps) => {
  return (
    <ul className="toy-msg-list clean-list">
      {msgs.map(msg => (
        <li key={msg.id}>
          <ToyMsgPreview msg={msg} />
        </li>
      ))}
    </ul>
  )
}

export default ToyMsgList
