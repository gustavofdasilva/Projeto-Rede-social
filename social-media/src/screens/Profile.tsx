import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CroppedImage from "../components/CroppedImage"
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import defaultIcon from '../assets/default-avatar.jpg'
import { createPostFunc, deletePost, getAllUserPosts, getUser, updateProfile } from "../utils/server_requests";
import { PostType, UserType } from "../utils/types";
import { convertTo64, deleteCookie, formatDate } from "../utils/general";
import { checkImg } from "../utils/form_check";

const Profile = () => {
  const {state} = useLocation()
  const {data} = state
  const [createPost,setCreatePost] = useState<PostType>({
    _id: undefined,
    userId: data._id,
    email: data.email,
    password: data.password,
    img:'',
    desc: '',
    date: new Date()
  })

  const [user,setUser] = useState<UserType>({
    _id:'',
    email:'',
    username:'',
    password:'',
    img:'',
  })
  const [postData, setPostData] = useState<PostType[]>([])
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
  
  const handleHomeButton = ():void => {
    deleteCookie('username')
    deleteCookie('email')
    deleteCookie('password')
    navigate('/')
  }

  const handleDeletePost = (post:PostType):void => {
    //! Fazer tela de confirmação
    deletePost(post._id ?? '')
      .then(()=>{
        window.location.reload()
      })
  }

  const handleConfirmChangeProfile = ():void => {
    if(newName.length>0||imgPreview!=null){
      updateProfile(user._id, newName, imgPreview,user)
      .then(()=>{
        window.location.reload()
      })
    } else {
      window.alert('Campos vazios')
    }
  }

  const handleConfirmNewPost = ():void => {
    if(createPost.desc != '') {
      createPostFunc(user._id,createPost.desc,new Date(),postImg,createPost.email,createPost.password)
      .then(()=>{
        window.location.reload()
      })
    } else {
      window.alert('Campo de descrição vazio!')
    }
  }

  const [newName,setNewName] = useState<string>('')

  const navigate = useNavigate()

  useEffect(()=>{
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
    <button onClick={handleHomeButton} className="btn btn-outline-secondary position-absolute top-0 end-0 m-3">Sair da conta</button>

      <main className="mx-auto bg-light my-auto p-5 rounded w-75 h-75 d-flex flex-column">

        <button className="btn btn-primary ms-4 align-self-end position-absolute" onClick={handleOpenUpdateProfile}>Alterar informações ✏️</button>

        <div className="d-flex align-items-center">
          <CroppedImage width={200} height={150} filePath={checkImg(user,imgPreview,defaultIcon)}/>
          <h1 className="ms-3">Olá, {user.username}!</h1>
        </div>

        <div className="d-flex flex-row align-items-center">
          <p className="fw-semibold fs-3 mt-3">Posts</p> 
          <button className="btn btn-outline-primary ms-3" onClick={handleOpenNewPost}>
              Novo post
          </button>

        </div>

        <div className={`w-100 h-100 d-flex flex-column border rounded overflow-auto ${(loading || postData?.length == 0)?'justify-content-center align-items-center':''}`}>
          {!loading && postData.map((post)=>{ //Colocar 3 pontos depois de ficar muito grande a descrição
            return(
              <div className="border w-100 p-2 d-flex justify-content-between" key={post._id}> 
                <p className="d-flex my-auto">{post.desc} - {formatDate(new Date(post.date))} </p>
                <button className="btn btn-outline-danger" onClick={()=>handleDeletePost(post)}>Apagar post</button>
              </div>
            )
          }).reverse()}
          {loading && <p>Carregando...</p>}
          {(!loading && postData?.length == 0) && <aside>Nenhum post encontrado, Comece a postar!</aside>}
        </div>
        
      </main>

      {/*//! Check user para não ter o mesmo nome de usuário*/}
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
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>inputFileUpdateProfile.current?.click()}> Alterar foto de perfil</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={handleConfirmChangeProfile}>Salvar mudanças</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNewPost} onHide={handleCloseNewPost} className="d-flex justify-content-center align-items-center"> {/*New Post*/}
        <Modal.Header closeButton>
          <Modal.Title>Novo post</Modal.Title>
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
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>inputFileNewPost.current?.click()}>Inserir foto no post</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={handleConfirmNewPost}>Postar publicação</Button>
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

export default Profile
