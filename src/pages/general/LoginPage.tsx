import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/store'
import {
  handleLogin,
  handleSignup,
  showErrorMessage,
  showSuccessMessage,
} from '../../store/slices/system.slice'
import { useInternationalization } from '../../customHooks/useInternationalization'
import { UserCredentials } from '../../models/user.model'

import LoginForm from '../../components/general/LoginForm'

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getTranslation } = useInternationalization()

  function toggleIsSignup() {
    setIsSignup(!isSignup)
  }

  async function onSubmit(credentials: UserCredentials) {
    try {
      if (isSignup) await _onSignup(credentials)
      else await _onLogin(credentials)
      navigate('/toy')
    } catch (err) {
      const msg = `Could not ${isSignup ? 'signup' : 'login'}, please try again later.`
      dispatch(showErrorMessage(msg))
    }
  }

  async function _onLogin(credentials: UserCredentials) {
    try {
      const user = await dispatch(handleLogin(credentials)).unwrap()
      dispatch(showSuccessMessage(`Welcome, ${user.fullName}`))
    } catch (err) {
      throw err
    }
  }

  async function _onSignup(credentials: UserCredentials) {
    try {
      const user = await dispatch(handleSignup(credentials)).unwrap()
      dispatch(showSuccessMessage(`Welcome, ${user.fullName}`))
    } catch (err) {
      throw err
    }
  }

  function getLoginOrSignupMsg() {
    return isSignup ? getTranslation('login-msg') : getTranslation('signup-msg')
  }

  return (
    <section className="login-page flex column align-center">
      <h1 className="login-title">{getTranslation('welcome')}!</h1>

      <LoginForm isSignup={isSignup} onSubmit={onSubmit} />
      <span className="change-method-msg flex">
        {getLoginOrSignupMsg()}
        <button className="btn-change-method" onClick={toggleIsSignup}>
          {isSignup ? getTranslation('login') : getTranslation('signup')}
        </button>
      </span>
    </section>
  )
}

export default LoginPage
