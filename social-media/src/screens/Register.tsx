import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
type Form = {
  email: string,
  username: string,
  password: string,
}

type User = {
  email: string, 
  username: string,
  password: string, 
  //Imagem
}

const Register = () => {
  
  const navigate = useNavigate()
  const [email, setEmail] = useState<boolean>(false)
  const [password, setPassword] = useState<boolean>(false)
  const [username, setUsername] = useState<boolean>(false)
  const [formData, setFormData] = useState<Form>()


  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Cadastrar</h1>
        <form method="POST" className="d-flex flex-column ">

          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-2 form-control ${email ? 'is-valid' : 'is-invalid'}`} required
          onChange={(value)=>{checkEmail(value.target.value, setEmail, formData, setFormData)}}/>

          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" maxLength={20} name="username" id="username" className={`mb-2 form-control ${username ? 'is-valid' : 'is-invalid'}`} required
          onChange={(value)=>checkName(value.target.value, setUsername, formData, setFormData)}/>

          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control ${password ? 'is-valid' : 'is-invalid'}`} required
          onChange={(value)=>{checkPassword(value.target.value, setPassword, formData, setFormData)}}/>

          {!password && <div className="invalid-feedback mb-2 ">A senha deve conter mais de 6 caracteres</div>}

          <input type="button" value="Criar conta" className="btn btn-primary mb-2 mt-4" onClick={()=>createUser(formData?.email,formData?.password, formData?.username, email, username, password, navigate)}/>
        </form>
        <aside className="">Já tem uma conta? <a href="/login">Entrar</a></aside>
      </main>
    </div>
  )
}

async function createUser(email: string | undefined, password: string | undefined, username: string | undefined, emailCheck: boolean, usernameCheck: boolean, passwordCheck: boolean, navigate: NavigateFunction){


  if((email != undefined && password != undefined && username != undefined) &&
    (emailCheck && passwordCheck && usernameCheck)) {
    const response =  await fetch('http://localhost:5000/users/register',{
        method: "POST",
        body: JSON.stringify({email, username, password/*, Imagem nula*/}),
        headers: {
          'Content-Type': 'application/json',
        }
      })  
    const data = await response.json()

    console.log('DATA:',data)
    
    navigate('/profile',{state:{data}})
  }
}

async function getAllUsers():Promise<User[]> {
  const response = await fetch('http://localhost:5000/users/')
  const data =  await response.json()

  return data
}

async function checkEmail(
  value:string, 
  setEmail: React.Dispatch<React.SetStateAction<boolean>>, 
  formData:Form | undefined,
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>) {
  const users = await getAllUsers()
  const regulation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) //eslint-disable-line
  const formattedValue = regulation.test(value)

  const equalEmails = users.filter((user: User)=>{
    return user.email == value
  })
  
  setEmail(formattedValue && equalEmails.length == 0)
  if(formattedValue && equalEmails.length == 0) {
    setFormData({
      email: value,
      password: formData?.password ?? '',
      username: formData?.username ?? ''
    })
  }
}

function checkPassword(
  value:string, 
  setPassword: React.Dispatch<React.SetStateAction<boolean>>,
  formData: Form | undefined, 
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>){
  if(value.length >= 6) {
    setPassword(true)  
    setFormData({
      email: formData?.email ?? '',
      username: formData?.username ?? '',
      password: value
    })
  } else {
    setPassword(false)
  }
}

async function checkName(
  value:string, 
  setUsername: React.Dispatch<React.SetStateAction<boolean>>, 
  formData:Form | undefined,
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>
  ) {
  const users = await getAllUsers()
  const equalNames = users.filter((user: User)=>{
    if(user.username == value) {
      return true
    } else {
      return false
    }
  })
  console.log(equalNames)
  if(equalNames.length == 0 && value != "") {
    setUsername(true)
    setFormData({
      email: formData?.email ?? '',
      username: value,
      password: formData?.password ?? '',
    })
  } else {
    setUsername(false)
  }
}

export default Register
