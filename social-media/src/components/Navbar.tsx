import React from 'react'
import CroppedImage from './CroppedImage'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { UserType } from '../utils/types'
import defaultImg from '../assets/default-avatar.jpg'


type Props = {
  user: UserType | Record<string,never>,
}

const handleGoToProfile = (props:Props, navigate:NavigateFunction) => {
  JSON.stringify(props.user) != "{}" ?
                navigate('/profile',{state:{data:props.user}}) :
                navigate('/login')
}

const Navbar = (props:Props) => {
  const navigate = useNavigate()
  return (
    <nav className="d-flex align-items-center w-100 navbar bg-dark text-white pe-5 ps-5">
        <h1 className="fs-2">Rede Social</h1>
        <div className='d-flex flex-row'>
            <button className={`btn btn-secondary ${JSON.stringify(props.user) != "{}" ? 'p-0' : 'p-2'}`} onClick={()=>{
              handleGoToProfile(props, navigate)
            }}>
              
              {!props.user?.username ? (props.user?.username ? 'Acessar perfil' : 'Logar') : 
              <CroppedImage width={50} height={50} filePath={props.user?.img  ?? defaultImg }/> }
            </button>
        </div>
    </nav>
  )
}

export default Navbar
