import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type Post = {
  _id: string | undefined,
  userId: string,
  desc: string,
  date: Date,
}


const Profile = () => {
  const {state} = useLocation()
  const {data} = state
  const [createPost,setCreatePost] = useState<Post>({
    _id: undefined,
    userId: data._id,
    desc: '',
    date: new Date()
  })

  const [postData, setPostData] = useState<Post[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    getAllUserPosts(data._id,setPostData, setLoading)
  },[])

  return (
    <div className="d-flex vw-100 vh-100 bg-dark justify-content-center aligm-items-center">
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Página inicial</a>
      <main className="mx-auto bg-light my-auto p-5 rounded w-75 h-75 d-flex flex-column">
        
        <div className="d-flex align-items-center">
          <img src="https://placehold.co/120x120" className="rounded"/>
          <h1 className="ms-3">Olá, {data.email}!</h1>
        </div>
        <div className="d-flex flex-row align-items-center">
          <p className="fw-semibold fs-3 mt-3">Posts</p> <button className="btn btn-outline-primary ms-3" onClick={()=>{
            createPostFunc(createPost.userId,createPost.desc,createPost.date)}}>Novo post</button>
        </div>
        <div>
          
          <p>{createPost.desc}</p>
        </div>
        <div className={`w-100 h-100 d-flex flex-column border rounded overflow-auto ${(loading || postData?.length == 0)?'justify-content-center align-items-center':''}`}>
          {!loading && postData.map((post)=>{
            console.log(post) //Colocar 3 pontos depois de ficar muito grande a descrição
            return(
              <div className="border w-100 p-2 d-flex justify-content-between" key={post._id}> 
                <p className="d-flex my-auto">{post.desc} - {formatDate(new Date(post.date))} </p>
                <button className="btn btn-primary">Acessar post</button>
              </div>
            )
          })}
          {loading && <p>Carregando...</p>}
          {(!loading && postData?.length == 0) && <aside>Nenhum post encontrado, Comece a postar!</aside>}
        </div>
      </main>
    </div>
  )
}

function formatDate(date: Date) {
  const day = date.getDate().toString().length==1? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth().toString().length==1? `0${date.getMonth()}` : date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

async function createPostFunc(userId: string, desc: string, date: Date){
  if(desc != '') {
    const response = await fetch('http://localhost:5000/posts/createPost', {
      method: "POST",
      body: JSON.stringify({userId,desc,date}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
  
    console.log(data)
  } else {
    //handle campo vazio
  }
  
}

async function getAllUserPosts(userId: string, setPosts:React.Dispatch<React.SetStateAction<Post[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>) {
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

export default Profile
