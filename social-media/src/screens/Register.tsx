import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormType } from "../utils/types"
import { checkEmail, checkName, checkPassword } from "../utils/form_check"
import { createUser } from "../utils/server_requests"



const Register = () => {
  
  const navigate = useNavigate()
  
  const [email, setEmail] = useState<boolean>(false)
  const [password, setPassword] = useState<boolean>(false)
  const [username, setUsername] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormType>()
  const handleChangeName = async (value: React.ChangeEvent<HTMLInputElement>) => {
    const name = await checkName(value.target.value)
    console.log(name)
    if(name) {
      setUsername(true)
      setFormData({
        email: formData?.email ?? '',
        username: name,
        password: formData?.password ?? '',
      })
    } else {
      setUsername(false)
    }
  }

  const handleChangeEmail = async (value: React.ChangeEvent<HTMLInputElement>)=>{
    checkEmail(value.target.value,setEmail,formData,setFormData)
  }

  const handleChangePassword = (value: React.ChangeEvent<HTMLInputElement>) => {
    const password = checkPassword(value.target.value)
    if(password) {
      setPassword(true)  
      setFormData({
        email: formData?.email ?? '',
        username: formData?.username ?? '',
        password: password
      })
    } else {
      setPassword(false)
    }
  }
  

  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Cadastrar</h1>
        <form method="POST" className="d-flex flex-column ">

          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-2 form-control ${email ? 'is-valid' : 'is-invalid'}`} required
          onChange={handleChangeEmail}/>

          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" maxLength={20} name="username" id="username" className={`mb-2 form-control ${username ? 'is-valid' : 'is-invalid'}`} required
          onChange={handleChangeName}/>

          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control ${password ? 'is-valid' : 'is-invalid'}`} required
          onChange={handleChangePassword}/>

          {!password && <div className="invalid-feedback mb-2 ">A senha deve conter mais de 6 caracteres</div>}

          <input type="button" value="Criar conta" className="btn btn-primary mb-2 mt-4" onClick={()=>createUser(formData?.email,formData?.password, formData?.username, email, username, password, navigate)}/>
        </form>
        <aside className="">Já tem uma conta? <a href="/login">Entrar</a></aside>
      </main>
    </div>
  )
}

export default Register
