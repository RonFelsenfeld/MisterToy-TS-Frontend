import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/general/LoginFrom'

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true)
  const navigate = useNavigate()

  function toggleIsSignup() {
    setIsSignup(!isSignup)
  }

  return (
    <section className="login-page flex column align-center">
      <h1 className="login-title">Welcome!</h1>

      <LoginForm isSignup={isSignup} />
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
