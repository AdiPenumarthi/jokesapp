import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const [jokesList, setJokesList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    const {history} = props
    if (token === undefined) {
      history.replace('/login')
    }
    const getJoke = async () => {
      const url =
        'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
      const response = await fetch(url)
      const data = await response.json()
      if (!data.error) {
        setJokesList(data.jokes)
        setErrorMsg('')
      } else {
        setErrorMsg(data.message)
      }
    }
    getJoke()
  }, [])

  const renderErrorMessage = () => (
    <div>
      <p className="message">{errorMsg}</p>
    </div>
  )

  const renderJokes = () => (
    <table className="jokes-list-container">
      <tr>
        <th className="category">Category</th>
        <th>Joke</th>
      </tr>
      {jokesList.map(item => (
        <tr>
          <td>{item.category}</td>
          <td className="joke">{item.joke}</td>
        </tr>
      ))}
    </table>
  )

  return (
    <>
      <Header />
      <div className="jokes-container">
        {errorMsg ? renderErrorMessage() : renderJokes()}
      </div>
    </>
  )
}
export default Home
