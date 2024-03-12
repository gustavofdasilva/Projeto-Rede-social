import { useRouteError } from 'react-router-dom'
import { checkError } from '../utils/general'


const ErrorScreen = () => {
 const errorMessage = checkError(useRouteError())

  return (
    <div className='vw-100 vh-100 bg-light d-flex row justify-content-center align-items-center'>
      <section className='w-25 d-flex justify-content-center align-align-items-center row'>
        <h1>Oops!</h1>
        <p>Sorry, a error has ocurred:</p>
        <p>{errorMessage}</p>
      </section>
    </div>
  )
}

export default ErrorScreen
