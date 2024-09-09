interface LoginFormProps {
  isSignup: boolean
}

const LoginForm = ({ isSignup }: LoginFormProps) => {
  return (
    <form className="login-form flex column align-center">
      <input type="text" name="username" placeholder="Username" required autoFocus />
      <input type="password" name="password" placeholder="Password" required autoComplete="off" />

      {isSignup && <input type="text" name="fullName" placeholder="Full name" required />}

      <button className="btn-submit">Login</button>
    </form>
  )
}

export default LoginForm
