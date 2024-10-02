import { ToyMsg } from '../../models/toy.model'

interface ToyMsgPreviewProps {
  msg: ToyMsg
}

const ToyMsgPreview = ({ msg }: ToyMsgPreviewProps) => {
  return <article className="toy-msg-preview">Hello from ToyMsgPreview</article>
}

export default ToyMsgPreview
