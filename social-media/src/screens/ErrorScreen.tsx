import { isRouteErrorResponse, useRouteError } from 'react-router-dom'


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

function checkError(error: unknown) {
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }
  return errorMessage
}

export default ErrorScreen
