import {HomePostType, PostType, UserType} from './types'
import { NavigateFunction } from "react-router-dom"

export async function getPosts(setPosts:React.Dispatch<React.SetStateAction<HomePostType[]>>) {
  const response = await fetch('http://localhost:5000/posts/',{
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data:HomePostType[] = await response.json()
  const newData = await Promise.all(
    data.map(async(post)=>{
      const user = await getUser(post.email,post.password)
      return {
        ...post,
        userImg: user.img,
        username: user.username,
      }
    }).reverse()
  )

  console.log(newData)
  setPosts(newData)
}

export async function getUser(email:string, password:string):Promise<UserType> {
  const response = await fetch('http://localhost:5000/users/profile',{
    method:"POST",
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({email,password}),
  })
  const data = await response.json()
  return data
}

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

export async function getAllUsers():Promise<UserType[]> {
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
        setPosts:React.Dispatch<React.SetStateAction<PostType[]>>, 
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
    ):Promise<UserType | undefined> {
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
      return data
      } catch (error) {
        console.log(error)
      }
        
    }
}

export async function updateProfile(
        _id: string, 
        newName: string, 
        newImgProfile: string | ArrayBuffer | undefined, 
        user: UserType
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

export async function deletePost(id:string) {
  await fetch('http://localhost:5000/posts/deletePost',{
    method:"DELETE",
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({id}),
  })
}