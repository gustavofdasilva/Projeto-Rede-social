import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CroppedImage from "../components/CroppedImage"

type Post = {
  _id: string | undefined,
  userId: string,
  username: string,
  //Imagem do perfil
  desc: string,
  date: Date,
}

const Profile = () => {
  const {state} = useLocation()
  const {data} = state
  const [createPost,setCreatePost] = useState<Post>({
    _id: undefined,
    userId: data._id,
    username: data.username,
    desc: '',
    date: new Date()
  })

  const [postData, setPostData] = useState<Post[]>([])
  const [imgPreview,setImgPreview] = useState<string | ArrayBuffer>()
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(()=>{
    console.log('userId:',data._id)
    getAllUserPosts(data._id,setPostData, setLoading)
  },[data._id])

  return (
    <div className="d-flex vw-100 vh-100 bg-dark justify-content-center aligm-items-center">
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Página inicial</a>
      <main className="mx-auto bg-light my-auto p-5 rounded w-75 h-75 d-flex flex-column">
        
        <div className="d-flex align-items-center">
          <CroppedImage width={200} height={150} filePath={imgPreview}/>
          <h1 className="ms-3">Olá, {data.username}!</h1>
          <input className="form-control w-25" type="file" accept=".png, .jpg, .jpeg"name="profileImage" id="profileImage" onChange={async (value)=>{
            const file = value.target.files
            if(file !== null) {
              const image:string = await convertTo64(file[0])
              setImgPreview(image)
              console.log(image)
            }
          }}/>
        </div>
        <div className="d-flex flex-row align-items-center">
          <p className="fw-semibold fs-3 mt-3">Posts</p> <button className="btn btn-outline-primary ms-3" 
            onClick={()=>{
            createPostFunc(data._id, data.username,createPost.desc,createPost.date)
            window.location.reload()
            }}>Novo post</button>
            <input type="text" name="desc" id="desc" className="input-group-text" onChange={(value)=>{setCreatePost({
              ...createPost,
              desc: value.target.value
            })
            }}/>
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

async function createPostFunc(userId: string, username: string, desc: string, date: Date){
  if(desc != '') {
    const response = await fetch('http://localhost:5000/posts/createPost', {
      method: "POST",
      body: JSON.stringify({userId, username,desc,date/*Imagem do post*/}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
  
    console.log(data)
  } else {
    console.log('campo vazio!')
  }
  
}

async function getAllUserPosts(
  userId: string, 
  setPosts:React.Dispatch<React.SetStateAction<Post[]>>, 
  setLoading:React.Dispatch<React.SetStateAction<boolean>>) {
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

async function convertTo64(file: Blob): Promise<string>{
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

export default Profile
