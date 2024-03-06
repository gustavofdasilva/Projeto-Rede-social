import Navbar from '../components/Navbar'
import SendPost from '../components/SendPost'
import Post from '../components/Post'
import { useEffect, useState } from 'react'

type Post = {
  _id: string | undefined,
  userId: string,
  username: string,
  desc: string,
  date: Date,
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
            <Post userName={post.username} postData={new Date(post.date)} desc={post.desc} key={post._id}/>
          )
        }): <p className='text-light fs-4'>Carregando...</p>}
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
  const data:[] = await response.json()
  console.log(data)
  setPosts(data.reverse())
  console.log(data)
  setLoading(false)
}

export default Home
