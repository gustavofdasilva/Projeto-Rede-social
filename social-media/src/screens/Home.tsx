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
  password: string,
  img: string,
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(()=>{
    getPosts(setPosts,setLoading)
  },[])

  return (
    <div className='d-flex flex-column align-items-center'>
        <Navbar/>
        <main className='bg-secondary'>
        <SendPost/>
        {!loading ? posts.map((post)=>{
          return(
            <Post userName={post.username} postData={new Date(post.date)} desc={post.desc} key={post._id} img={post.img} userImg={post.userImg}/>
          )
        }): <p>Carregando...</p>}
        </main>
    </div>
  )
}

async function getPosts(setPosts:React.Dispatch<React.SetStateAction<Post[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>) {
  const response = await fetch('http://localhost:5000/posts/',{
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data:Post[] = await response.json()
  const newData = await Promise.all(
    data.map(async(post)=>{
      const userImg = await getUser(post.email,post.password)
      return {
        ...post,
        userImg: userImg.img
      }
    }).reverse()
  )

  console.log(newData)
  setPosts(newData)
  setLoading(false)
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

export default Home
