import Navbar from '../components/Navbar'
import SendPost from '../components/SendPost'
import Post from '../components/Post'
import { useEffect, useState } from 'react'

type Post = {
  _id: string | undefined,
  userId: string,
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
    <div className='d-flex row justify-content-center '>
        <Navbar/>
        <main className='w-50 bg-secondary center'>
        <SendPost/>
        {posts.map((post)=>{
          return(
            <Post userName={post.userId} postData={new Date(post.date)} desc={post.desc} key={post._id}/>
          )
        })}
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
  const data = await response.json()
  console.log(data)
  setPosts(data)
  console.log(data)
  setLoading(false)
}

export default Home
