import { ToyMsg } from '../../models/toy.model'

interface ToyMsgPreviewProps {
  msg: ToyMsg
}

const ToyMsgPreview = ({ msg }: ToyMsgPreviewProps) => {
  const { txt, by } = msg
  return (
    <article className="toy-msg-preview">
      <p className="msg-txt">
        {txt}
        <span className="msg-by"> ({by.fullName})</span>
      </p>
    </article>
  )
}

export default ToyMsgPreview
