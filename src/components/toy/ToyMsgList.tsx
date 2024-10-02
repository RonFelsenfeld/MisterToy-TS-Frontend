import { ToyMsg } from '../../models/toy.model'

interface ToyMsgListProps {
  msgs: ToyMsg[]
}

const ToyMsgList = ({ msgs }: ToyMsgListProps) => {
  return <ul className="toy-msg-list">Hello from ToyMsgList</ul>
}

export default ToyMsgList
