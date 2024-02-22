function App() {

  return (
    <div className='d-flex row justify-content-center'>
      <nav className="d-flex align-items-center navbar bg-dark text-white pe-5 ps-5">
        <h1 className="fs-2">Social Media</h1>
        <div>
          <button className='btn btn-secondary'>Perfil</button>
        </div>
      </nav>
      <main className='w-50 h-100 bg-dark center'>
        <section className='p-3 bg-light m-3 d-flex justify-content-between align-items-center'>
          <textarea name="text" id="text" rows={1} className='w-75'></textarea>
          <button className='btn btn-primary'>Post</button>
        </section>
        <section className='p-3 bg-light m-3'>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <img src="https://placehold.co/120x120" alt="#" width={60}/>
            <p>User - Date</p>
          </div>
          <p>Description</p>
          <img src="https://placehold.co/600x400" alt="#" className='w-100'/>
        </section>
        
      </main>
    </div>
  )
}

export default App
