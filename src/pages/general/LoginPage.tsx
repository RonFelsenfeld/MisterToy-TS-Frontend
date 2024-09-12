import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/store'
import { UserCredentials } from '../../models/user.model'

import LoginForm from '../../components/general/LoginForm'
import { handleLogin, handleSignup } from '../../store/slices/system.slice'

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function toggleIsSignup() {
    setIsSignup(!isSignup)
  }

  async function onSubmit(credentials: UserCredentials) {
    try {
      if (isSignup) await _onSignup(credentials)
      else await _onLogin(credentials)
    } catch (err) {
      console.error('Login Page -> Had issues with submitting form:', err)
    } finally {
      navigate('/toy')
    }
  }

  async function _onLogin(credentials: UserCredentials) {
    try {
      await dispatch(handleLogin(credentials))
    } catch (err) {
      console.error('Had issues with handling login:', err)
    }
  }

  async function _onSignup(credentials: UserCredentials) {
    try {
      await dispatch(handleSignup(credentials))
    } catch (err) {
      console.error('Had issues with handling signup:', err)
    }
  }

  return (
    <section className="login-page flex column align-center">
      <h1 className="login-title">Welcome!</h1>

      <LoginForm isSignup={isSignup} onSubmit={onSubmit} />
      <span className="change-method-msg flex">
        {isSignup ? 'Already have an account?' : "Don't have an account yet?"}
        <button className="btn-change-method" onClick={toggleIsSignup}>
          {isSignup ? 'Log in' : 'Sign up'}
        </button>
      </span>
    </section>
  )
}

export default LoginPage
