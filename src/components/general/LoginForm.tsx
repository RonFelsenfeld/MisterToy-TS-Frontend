import { useState } from 'react'
import { userService } from '../../services/user.service'

import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { useInternationalization } from '../../customHooks/useInternationalization'

import { UserCredentials } from '../../models/user.model'
import { FormSubmitEvent, InputChangeEvent } from '../../models/event.model'

interface LoginFormProps {
  isSignup: boolean
  onSubmit: (credentials: UserCredentials) => void
}

const LoginForm = ({ isSignup, onSubmit }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<UserCredentials>(
    userService.getDefaultCredentials(isSignup)
  )
  const { getTranslation } = useInternationalization()

  useEffectUpdate(() => {
    setCredentials(userService.getDefaultCredentials(isSignup))
  }, [isSignup])

  function handleChange({ target }: InputChangeEvent) {
    const { name: field, value } = target
    setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev: FormSubmitEvent) {
    ev.preventDefault()
    onSubmit(credentials)
  }

  const { username, password, fullName } = credentials

  return (
    <form onSubmit={handleSubmit} className="login-form flex column align-center">
      <input
        type="text"
        name="username"
        placeholder={getTranslation('username')}
        value={username}
        onChange={handleChange}
        required
        autoFocus
      />

      <input
        type="password"
        name="password"
        placeholder={getTranslation('password')}
        value={password}
        onChange={handleChange}
        required
        autoComplete="off"
        minLength={isSignup ? 5 : undefined}
        maxLength={isSignup ? 20 : undefined}
      />

      {isSignup && (
        <input
          type="text"
          name="fullName"
          placeholder={getTranslation('fullname')}
          value={fullName || ''}
          onChange={handleChange}
          required
        />
      )}

      <button className="btn-submit">
        {isSignup ? getTranslation('signup') : getTranslation('login')}
      </button>
    </form>
  )
}

export default LoginForm
