import { useState } from "react"

const Register = () => {

  const [email, setEmail] = useState<boolean>()
  const [password, setPassword] = useState<boolean>()


  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Cadastrar</h1>
        <form action="/#" method="GET" className="d-flex flex-column ">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-4 form-control ${
            email ? 'is-valid' : 'is-invalid'
          }`} required
          onChange={(value)=>{checkEmail(value.target.value, setEmail)}}/>
          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control ${
            password ? 'is-valid' : 'is-invalid'
          }`} required
          onChange={(value)=>{checkPassword(value.target.value, setPassword)}}/>
          {!password && <div className="invalid-feedback mb-2 ">A senha deve conter mais de 6 caracteres</div>}

          <input type="button" value="Entrar na conta" className="btn btn-primary mb-2 mt-4"/>
        </form>
        <aside className="">Já tem uma conta? <a href="/login">Entrar</a></aside>
      </main>
    </div>
  )
}

function checkEmail(value:string, setEmail: React.Dispatch<React.SetStateAction<boolean | undefined>>){
  const regulation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) //eslint-disable-line
  const formattedValue = regulation.test(value)
  console.log(formattedValue)
  setEmail(formattedValue)
}

function checkPassword(value:string, setPassword: React.Dispatch<React.SetStateAction<boolean | undefined>>){
  setPassword(value.length >= 6 ? true : false)
}

export default Register
