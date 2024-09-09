import { useState } from 'react'
import { userService } from '../../services/user.service'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'

import { UserCredentials } from '../../models/user.model'
import { InputChangeEvent } from '../../models/event.model'

interface LoginFormProps {
  isSignup: boolean
}

const LoginForm = ({ isSignup }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<UserCredentials>(
    userService.getDefaultCredentials()
  )

  console.log(`credentials`, credentials)

  useEffectUpdate(() => {
    setCredentials(userService.getDefaultCredentials(isSignup))
  }, [isSignup])

  function handleChange({ target }: InputChangeEvent) {
    const { name: field, value } = target
    setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
  }

  const { username, password, fullName } = credentials

  return (
    <form className="login-form flex column align-center">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleChange}
        required
        autoFocus
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      {isSignup && (
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={fullName || ''}
          onChange={handleChange}
          required
        />
      )}

      <button className="btn-submit">{isSignup ? 'Sign up' : 'Login'}</button>
    </form>
  )
}

export default LoginForm
