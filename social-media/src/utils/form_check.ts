import { getAllUsers } from './server_requests'
import {FormType, UserType} from './types'

export async function checkEmail(
        value:string, 
        setEmail: React.Dispatch<React.SetStateAction<boolean>>, 
        formData:FormType | undefined,
        setFormData: React.Dispatch<React.SetStateAction<FormType | undefined>>
    ) {
    const users = await getAllUsers()
    const regulation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) //eslint-disable-line
    const formattedValue = regulation.test(value)
  
    const equalEmails = users.filter((user: UserType)=>{
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

export function checkPassword(
        value:string, 
    ) {
    if(value.length >= 6) {
      return value
    }
      // setPassword(true)  
      // setFormData({
      //   email: formData?.email ?? '',
      //   username: formData?.username ?? '',
      //   password: value
      // })
    // } else {
    //   // setPassword(false)
    // }
    return false
}

export async function checkName(
        value:string, 
    ) {
    const users = await getAllUsers()
    const equalNames = users.filter((user: UserType)=>{
      if(user.username == value) {
        return true
      } else {
        return false
      }
    })
    if(equalNames.length == 0 && value != "") {
      return value
      // setUsername(true)
      // setFormData({
      //   email: formData?.email ?? '',
      //   username: value,
      //   password: formData?.password ?? '',
      // })
    }
    return false
    // } else {
    //   setUsername(false)
    // }
}

export function checkImg(
        user: UserType, 
        imgPreview: string | ArrayBuffer | undefined, defaultPath:string
    ) {
    const userImg = user.img
    const newImg = imgPreview
  
    if(newImg != null) {
      return newImg
    }
  
    if(userImg != null) {
      return userImg
    }
  
    console.log('Sem foto', defaultPath)
  
    return defaultPath
}
  