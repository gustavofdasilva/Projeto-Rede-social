import Navbar from '../components/Navbar'
import SendPost from '../components/SendPost'
import Post from '../components/Post'
import { useEffect, useState } from 'react'

type Post = {
  _id: string | undefined,
  userId: string,
  userImg: string,
  img: string,
  username: string,
  desc: string,
  date: Date,
  email: string,
  password: string,
}

type User = {
  _id: string,
  username: string,
  email:string,
  password: string,
  img: string,
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading,setLoading] = useState<boolean>(true)
  const [user,setUser] = useState<User>()

  useEffect(()=>{
    getPosts(setPosts).then(()=>{
      checkUser()
        .then(response=>{
          setUser(response)
          setLoading(false)
      })
    }
    )
    
  },[])

  return (
    <div className='d-flex flex-column align-items-center'>
        <Navbar
        user={user}/>
        <main className='bg-secondary-subtle'>
        { (JSON.stringify(user) != '{}' && user)&& <SendPost user={user}/>}
        {!loading ? posts.map((post)=>{
          return(
            <Post userName={post.username} postData={new Date(post.date)} desc={post.desc} key={post._id} img={post.img} userImg={post.userImg}/>
          )
        }): <p className='fs-2 m-5 text-dark'>Carregando...</p>}
        </main>
    </div>
  )
}

async function getPosts(setPosts:React.Dispatch<React.SetStateAction<Post[]>>) {
  const response = await fetch('http://localhost:5000/posts/',{
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data:Post[] = await response.json()
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

async function getUser(email:string, password:string):Promise<User> {
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

async function checkUser() {
  const username = getCookie('username')
  const email = getCookie('email')
  const password = getCookie('password')

  if(username && email && password) {
    return await fetchUser(email,password)
  } else {
    return false
  }
}

function getCookie(name: string){
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

{/*function deleteCookie(name:string){
  document.cookie=`${name}=null`
}*/}

async function fetchUser(email: string | undefined, password: string | undefined) {
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





export default Home
