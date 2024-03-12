import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import CroppedImage from "./CroppedImage";
import { PostType, UserType } from "../utils/types";



type Props = {
  user: UserType | Record<string,never>
}

const SendPost = (props: Props) => {
  const [showNewPost, setShowNewPost] = useState(false);
  const inputFileNewPost = useRef<HTMLInputElement | null>(null);
  const [postImg,setPostImg] = useState<string | ArrayBuffer>()
  const handleOpenNewPost = () => setShowNewPost(true);
  const handleCloseNewPost = () => setShowNewPost(false)

  const [createPost,setCreatePost] = useState<PostType>({
    _id: undefined,
    userId: props.user?._id,
    email: props.user?.email,
    password: props.user?.password,
    img:'',
    desc: '',
    date: new Date()
  })

  return (
    <>
    <section className='p-3 bg-light m-3 d-flex justify-content-between align-items-center rounded'>
        <button onClick={()=>{
            handleOpenNewPost()
            }}
            className='btn btn-primary'>Novo Post ✏️</button>
    </section>

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
        <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>{inputFileNewPost.current?.click()}}>Inserir foto no post</Button>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button onClick={()=>{
          if(createPost.desc != '') {
            createPostFunc(props.user._id,props.user.username,createPost.desc,new Date(),postImg,createPost.email,createPost.password)
            .then(()=>{
              window.location.reload()
            })
          } else {
            window.alert('Campo de descrição vazio!')
          }
        }}>Postar publicação</Button>
      </Modal.Footer>
      </Modal>

      <input style={{display:"none"}} ref={inputFileNewPost} type="file" accept=".png, .jpg, .jpeg"name="profileImage" id="profileImage" onChange={async (value)=>{
        const file = value.target.files
        if(file !== null) {
          const image:string = await convertTo64(file[0])
          setPostImg(image)
        }
      }}/>
    </>
  )
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

async function createPostFunc(userId: string, username: string, desc: string, date: Date, img:string | ArrayBuffer | undefined, email: string, password: string){
  if(desc != '') {
    await fetch('http://localhost:5000/posts/createPost', {
      method: "POST",
      body: JSON.stringify({userId,desc,date,img,email,password}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } else {
    console.log('campo vazio!')
  }
  
}

export default SendPost
