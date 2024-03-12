import { isRouteErrorResponse } from "react-router-dom"
import { fetchUser } from "./server_requests"
import { UserType } from "./types"

export function formatDate(date: Date) {
    const day = date.getDate().toString().length==1? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth().toString().length==1? `0${date.getMonth()+1}` : date.getMonth()+1
    const year = date.getFullYear()
  
    return `${day}/${month}/${year}`
}

export async function convertTo64(file: Blob): Promise<string>{
    return new Promise((resolve,reject)=>{
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if(typeof reader.result == 'string') {
          resolve(reader.result)
        }
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
}

export function deleteCookie(name:string){
    document.cookie=`${name}=null`
}

export async function checkUser():Promise<UserType | Record<string, never>> {
    const username = getCookie('username')
    const email = getCookie('email')
    const password = getCookie('password')
  
    if(username && email && password) {
      const data:UserType|undefined = await fetchUser(email,password)

      return data ?? {}
    } else {
      return {}
    }
}

export function getCookie(name: string){
    const cDecoded = decodeURIComponent(document.cookie)
    const cArray = cDecoded.split('; ')
  
    const valuesArr = cArray.map((element: string)=>{
      if(element.includes(name)) {
        const subArr = element.split('=')
        return subArr[1]
      }
    }).filter((element)=>{
      return element??false
    })
  
    return valuesArr[0]
}

export function checkError(error: unknown) {
    let errorMessage: string;
    if (isRouteErrorResponse(error)) {
      // error is type `ErrorResponse`
      errorMessage = error.statusText;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = 'Unknown error';
    }
    return errorMessage
}
