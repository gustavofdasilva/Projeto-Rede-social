import Navbar from '../components/Navbar'
import SendPost from '../components/SendPost'
import Post from '../components/Post'
import { useEffect, useState } from 'react'
import { HomePostType, UserType } from '../utils/types'
import { getPosts } from '../utils/server_requests'
import { checkUser } from '../utils/general'
import defaultImg from '../assets/default-avatar.jpg'

const Home = () => {
  const [posts, setPosts] = useState<HomePostType[]>([])
  const [loading,setLoading] = useState<boolean>(true)
  const [user,setUser] = useState<UserType | Record<string,never>>({})

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
        user={user ?? {}}/>
        <main className='bg-secondary-subtle'>
        { (JSON.stringify(user) != '{}' && user)&& <SendPost user={user ?? {}}/>}
        {!loading ? posts.map((post)=>{
          return(
            <Post userName={post.username} postData={new Date(post.date)} desc={post.desc} key={post._id} img={post.img} userImg={post.userImg  ?? defaultImg}/>
          )
        }): <p className='fs-2 m-5 text-dark'>Carregando...</p>}
        </main>
    </div>
  )
}

export default Home
