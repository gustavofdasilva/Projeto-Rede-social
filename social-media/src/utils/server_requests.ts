import {Post, User} from './types'
import { NavigateFunction } from "react-router-dom"

export async function createUser(
    email: string | undefined, 
    password: string | undefined, 
    username: string | undefined, 
    emailCheck: boolean, 
    usernameCheck: boolean, 
    passwordCheck: boolean, 
    navigate: NavigateFunction
    ) {
    if((email != undefined && password != undefined && username != undefined) &&
      (emailCheck && passwordCheck && usernameCheck)) {
      const response =  await fetch('http://localhost:5000/users/register',{
          method: "POST",
          body: JSON.stringify({email, username, password, img:null}),
          headers: {
            'Content-Type': 'application/json',
          }
        })  
      const data = await response.json()
  
      console.log('DATA:',data)
  
      document.cookie=`username=${data.username}`
      document.cookie=`email=${data.email}`
      document.cookie=`password=${data.password}`
      navigate('/profile',{state:{data}})
    }
}

export async function getAllUsers():Promise<User[]> {
    const response = await fetch('http://localhost:5000/users/')
    const data =  await response.json()
  
    return data
}

export async function createPostFunc(
        userId: string, 
        desc: string, 
        date: Date, 
        img:string | ArrayBuffer | undefined, 
        email: string, 
        password: string
    ) {
    if(desc != '') {
        await fetch('http://localhost:5000/posts/createPost', {
        method: "POST",
        body: JSON.stringify({userId,desc,date,img,email,password}),
        headers: {
            'Content-Type': 'application/json',
        }
        })
    } else {
        console.log('campo vazio!')
    }
}

export async function getAllUserPosts(
        userId: string, 
        setPosts:React.Dispatch<React.SetStateAction<Post[]>>, 
        setLoading:React.Dispatch<React.SetStateAction<boolean>>
    ) {
    console.log(userId)
    const response = await fetch('http://localhost:5000/posts/getUserPosts',{
      method:'POST',
      body: JSON.stringify({userId}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    console.log(data)
    setPosts(data)
    setLoading(false)
}

export async function fetchUser(
        email: string | undefined, 
        password: string | undefined, 
        //navigate: NavigateFunction
    ) {
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
      //navigate('/profile',{state:{data}})
      } catch (error) {
        console.log(error)
      }
        
    }
}

export async function updateProfile(
        _id: string, 
        newName: string, 
        newImgProfile: string | ArrayBuffer | undefined, 
        user: User
    ) {
  
    const username = newName != '' ? newName : user.username
    const img = newImgProfile != '' ? newImgProfile : user.img
  
    
    await fetch('http://localhost:5000/users/updateUser',{    
      method: 'PUT',
      body:JSON.stringify({_id:_id,username:username,img:img}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  
    .then(()=>{
      return
    })
}