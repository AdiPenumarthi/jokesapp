import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submitForm = e => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    // Dummy login logic
    if (username === 'Adi' && password === 'adi@2024') {
      // Successful login
      alert('Login successful!')
      const {history} = props
      Cookies.set('jwt_token', 'login-key', {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      setError('Invalid username or password')
    }
  }

  useEffect(() => {
    const {history} = props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }
  }, [])

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="heading">LOGIN</h1>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="username-input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            PASSWORD
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="password-input-field"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default LoginForm
