import React from 'react'

const Navbar = () => {
  return (
    <nav className="d-flex align-items-center w-100 navbar bg-dark text-white pe-5 ps-5">
        <h1 className="fs-2">Social Media</h1>
        <div>
            <a className='btn btn-secondary' href='/login'>Perfil</a>
        </div>
    </nav>
  )
}

export default Navbar
