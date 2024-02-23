import Navbar from '../components/Navbar'
import SendPost from '../components/SendPost'
import Post from '../components/Post'

const Home = () => {
  return (
    <div className='d-flex row justify-content-center '>
        <Navbar/>
        <main className='w-50 bg-secondary center'>
        <SendPost/>
        <Post/>
        </main>
    </div>
  )
}

export default Home
