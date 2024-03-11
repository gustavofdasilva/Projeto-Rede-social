import React from 'react'
import CroppedImage from './CroppedImage'
import { useNavigate } from 'react-router-dom'

type User = {
  _id: string,
  username: string,
  email:string,
  password: string,
  img: string,
}

type Props = {
  user?: User,
}

const Navbar = (props:Props) => {
  const navigate = useNavigate()
  return (
    <nav className="d-flex align-items-center w-100 navbar bg-dark text-white pe-5 ps-5">
        <h1 className="fs-2">Social Media</h1>
        <div className='d-flex flex-row'>
            <button className={`btn btn-secondary ${props.user?.img ? 'p-0' : 'p-2'}`} onClick={()=>{
              JSON.stringify(props.user) != "{}" ?
                navigate('/profile',{state:{data:props.user}}) :
                navigate('/login')
            }}>
              
              {!props.user?.username ? (props.user?.username ? 'Acessar perfil' : 'Logar') : 
              <CroppedImage width={50} height={50} filePath={props.user?.img}/> }
            </button>
        </div>
    </nav>
  )
}

export default Navbar
