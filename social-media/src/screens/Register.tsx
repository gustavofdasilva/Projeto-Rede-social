import { useState } from "react"
type Form = {
  email: string,
  password: string,
}

const Register = () => {
  
  const [email, setEmail] = useState<boolean>()
  const [password, setPassword] = useState<boolean>()
  const [formData, setFormData] = useState<Form>()


  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Cadastrar</h1>
        <form method="POST" className="d-flex flex-column ">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-4 form-control ${email ? 'is-valid' : 'is-invalid'}`} required
          onChange={(value)=>{checkEmail(value.target.value, setEmail, formData, setFormData)}}/>
          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control ${password ? 'is-valid' : 'is-invalid'}`} required
          onChange={(value)=>{checkPassword(value.target.value, setPassword, formData, setFormData)}}/>
          {!password && <div className="invalid-feedback mb-2 ">A senha deve conter mais de 6 caracteres</div>}
          <p>{formData?.email} / {formData?.password}</p>
          <input type="submit" value="Entrar na conta" className="btn btn-primary mb-2 mt-4" />
        </form>
        <aside className="">Já tem uma conta? <a href="/login">Entrar</a></aside>
      </main>
    </div>
  )
}

function checkEmail(
  value:string, 
  setEmail: React.Dispatch<React.SetStateAction<boolean | undefined>>, 
  formData:Form | undefined,
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>) {

  const regulation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) //eslint-disable-line
  const formattedValue = regulation.test(value)
  console.log(formattedValue)
  setEmail(formattedValue)
  if(formattedValue) {
    setFormData({
      email: value,
      password: formData?.password ?? ''
    })
  }
}

function checkPassword(
  value:string, 
  setPassword: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  formData: Form | undefined, 
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>){
  if(value.length >= 6) {
    setPassword(true)  
    setFormData({
      email: formData?.email ?? '',
      password: value
    })
  } else {
    setPassword(false)
  }
}

export default Register
