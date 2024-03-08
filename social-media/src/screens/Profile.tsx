import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import CroppedImage from "../components/CroppedImage"
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

type Post = {
  _id: string | undefined,
  userId: string,
  username: string,
  img: string,
  desc: string,
  date: Date,
}

type User = {
  _id: string,
  username: string,
  password: string,
  img: string,
}

const Profile = () => {
  const {state} = useLocation()
  const {data} = state
  const [createPost,setCreatePost] = useState<Post>({
    _id: undefined,
    userId: data._id,
    username: data.username,
    img:'',
    desc: '',
    date: new Date()
  })

  const [user,setUser] = useState<User>({
    _id:'',
    username:'',
    password:'',
    img:'',
  })
  const [postData, setPostData] = useState<Post[]>([])
  const [imgPreview,setImgPreview] = useState<string | ArrayBuffer>()
  const [postImg,setPostImg] = useState<string | ArrayBuffer>()
  const [loading, setLoading] = useState<boolean>(true)

  const inputFileUpdateProfile = useRef<HTMLInputElement | null>(null); //inputFileUpdateProfile.current?.click()
  const inputFileNewPost = useRef<HTMLInputElement | null>(null); //inputFileUpdateProfile.current?.click()

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const handleOpenUpdateProfile = () => setShowUpdateProfile(true);
    const handleCloseUpdateProfile = () => setShowUpdateProfile(false)

  const [showNewPost, setShowNewPost] = useState(false);
    const handleOpenNewPost = () => setShowNewPost(true);
    const handleCloseNewPost = () => setShowNewPost(false)

  const [newName,setNewName] = useState<string>('')

  useEffect(()=>{
    console.log('userId:',data._id)
    getAllUserPosts(data._id,setPostData, setLoading)
  },[data._id])

  useEffect(()=>{
    getUser(data.email,data.password)
    .then((resolve):void=>{
      setUser(resolve)
    })
  },[data.email,data.password])

  return (
    <div className="d-flex vw-100 vh-100 bg-dark justify-content-center aligm-items-center">
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Página inicial</a>

      <main className="mx-auto bg-light my-auto p-5 rounded w-75 h-75 d-flex flex-column">

        <button className="btn btn-primary ms-4 align-self-end position-absolute" onClick={()=>{handleOpenUpdateProfile()}}>Alterar informações ✏️</button>

        <div className="d-flex align-items-center">
          <CroppedImage width={200} height={150} filePath={imgPreview}/>
          <h1 className="ms-3">Olá, {user.username}!</h1>
        </div>

        <div className="d-flex flex-row align-items-center">
          <p className="fw-semibold fs-3 mt-3">Posts</p> 
          <button 
            className="btn btn-outline-primary ms-3" 
            onClick={()=>{
            handleOpenNewPost()
            }}>
              Novo post
          </button>

          
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

      <Modal show={showUpdateProfile} onHide={handleCloseUpdateProfile} className="d-flex justify-content-center align-items-center"> {/*Update profile*/}
        <Modal.Header closeButton>
          <Modal.Title>Alterar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 d-flex flex-column">
          <div className="d-flex flex-row mb-3 mt-3">
            <p className="m-0 me-4 fs-5">Nome: </p>
            <input type="text" name="text" id="text" className="input-group-text" onChange={(value)=>{
              setNewName(value.target.value) 
            }}/>
          </div>
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>{inputFileUpdateProfile.current?.click()}}> Alterar foto de perfil</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={()=>{
            updateProfile(user._id, newName, imgPreview)
              .then(()=>{
                window.location.reload()
              })
          }}>Salvar mudanças</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNewPost} onHide={handleCloseNewPost} className="d-flex justify-content-center align-items-center"> {/*New Post*/}
        <Modal.Header closeButton>
          <Modal.Title>Alterar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 d-flex flex-column">
          <div className="d-flex flex-row mb-3 mt-3">
            <p className="m-0 me-4 fs-5">Descrição: </p>
            <textarea name="desc" id="desc" cols={30} rows={5} className="input-group-text text-start" onChange={(value)=>{setCreatePost({
                ...createPost,
                desc: value.target.value
              })
            }}>
            </textarea>
          </div>
          {postImg && <CroppedImage width={200} height={200} filePath={postImg} className="align-self-center"/>}
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>{inputFileNewPost.current?.click()}}>Inserir foto no post</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={()=>{updateProfile()}}>Salvar mudanças</Button>
        </Modal.Footer>
      </Modal>
      
      <input style={{display:"none"}} ref={inputFileUpdateProfile} type="file" accept=".png, .jpg, .jpeg"name="profileImage" id="profileImage" onChange={async (value)=>{
          const file = value.target.files
          if(file !== null) {
            const image:string = await convertTo64(file[0])
            setImgPreview(image)
          }
      }}/>

      <input style={{display:"none"}} ref={inputFileNewPost} type="file" accept=".png, .jpg, .jpeg"name="profileImage" id="profileImage" onChange={async (value)=>{
        const file = value.target.files
        if(file !== null) {
          const image:string = await convertTo64(file[0])
          setPostImg(image)
        }
      }}/>
    </div>
  )
}

function formatDate(date: Date) {
  const day = date.getDate().toString().length==1? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth().toString().length==1? `0${date.getMonth()}` : date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

async function createPostFunc(userId: string, username: string, desc: string, date: Date, img:string){
  if(desc != '') {
    const response = await fetch('http://localhost:5000/posts/createPost', {
      method: "POST",
      body: JSON.stringify({userId, username,desc,date,img}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
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

async function updateProfile(_id: string, newName: string, newImgProfile: string | ArrayBuffer | undefined) {
  
  const username = newName != '' ? newName : null
  const img = newImgProfile != '' ? newImgProfile : null

  console.log(username)
  
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

async function getUser(email: string, password: string): Promise<User>{
  const response = await fetch('http://localhost:5000/users/profile',{
    method:'POST',
    body: JSON.stringify({email,password}),
    headers: {
      'Content-type':'application/json'
    }
  })

  const data = await response.json()

  return data
}

export default Profile
