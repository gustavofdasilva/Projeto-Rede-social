const Login = () => {
  return (
    <div className='d-flex vw-100 vh-100 bg-dark justify-content-center align-items-center'>
      <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Voltar</a>
      <main className="bg-light p-5 rounded flex-row w-25 mx-auto">
        <h1 className="fs-2 mb-4">Login</h1>
        <form action="/" method="GET" className="d-flex flex-column ">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" id="email" className={`mb-4 form-control`} required/>
          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" name="password" id="password" className={`mb-2 form-control`} required/>
          <input type="button" value="Entrar na conta" className="btn btn-primary mb-2 mt-4" />
          <a href="/profile">Perfil</a>
        </form>
        <aside className="">Não tem uma conta? <a href="/register">Cadastrar</a></aside>
      </main>
    </div>
  )
}

export default Login
