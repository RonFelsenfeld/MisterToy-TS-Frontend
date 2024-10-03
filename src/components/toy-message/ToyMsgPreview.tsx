import { useSelector } from 'react-redux'

import { authService } from '../../services/auth.service'
import { RootState } from '../../store/store'
import { ToyMsg } from '../../models/toy.model'

interface ToyMsgPreviewProps {
  msg: ToyMsg
  onRemoveMsg: (msgId: string) => void
}

const ToyMsgPreview = ({ msg, onRemoveMsg }: ToyMsgPreviewProps) => {
  const user = useSelector((state: RootState) => state.systemModule.loggedInUser)

  const { txt, by } = msg
  return (
    <article className="toy-msg-preview flex align-center justify-between">
      <p className="msg-txt">
        {txt}
        <span className="msg-by"> ({by.fullName})</span>
      </p>

      {authService.isAuthorized(user) && (
        <button className="btn-remove" onClick={onRemoveMsg.bind(null, msg.id)}>
          Remove
        </button>
      )}
    </article>
  )
}

export default ToyMsgPreview
