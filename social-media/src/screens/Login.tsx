import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

type Form = {
  email: string,
  username: string,
  password: string,
}

const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState<Form>()

  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
      <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Login</h1>
        <form action="/" method="GET" className="d-flex flex-column ">

          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-4 form-control`} required onChange={(value)=>{setFormData({email: value.target.value, password: formData?.password ?? '', username: formData?.username ?? ''})}}/>

          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control`} required onChange={(value)=>{setFormData({email: formData?.email ?? '', password: value.target.value, username: formData?.username ?? ''})}}/>

          <input type="button" value="Entrar na conta" className="btn btn-primary mb-2 mt-4" onClick={()=>{
            fetchUser(formData?.email,formData?.password, navigate)
            console.log("Clicou")
          }}/>
        </form>
        <aside className="">Não tem uma conta? <a href="/register">Cadastrar</a></aside>
      </main>
    </div>
  )
}

async function fetchUser(email: string | undefined, password: string | undefined, navigate: NavigateFunction) {
  if(email != undefined && password != undefined) {
    console.log("Email e senha DEFINIDO")
    try {
      const response = await fetch('http://localhost:5000/users/profile',{
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    
    document.cookie=`username=${data.username}`
    document.cookie=`email=${data.email}`
    document.cookie=`password=${data.password}`
    navigate('/profile',{state:{data}})
    } catch (error) {
      console.log(error)
    }
      
  }
}

export default Login
