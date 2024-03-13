import { useRef, useState } from "react";
import { PostType, UserType } from "../utils/types";
import { convertTo64 } from "../utils/general";
import { createPostFunc } from "../utils/server_requests";
import ModalTemplate from "./ModalTemplate";



type Props = {
  user: UserType | Record<string,never>
}

const SendPost = (props: Props) => {
  const [showNewPost, setShowNewPost] = useState(false);
  const inputFileNewPost = useRef<HTMLInputElement | null>(null);
  const [postImg,setPostImg] = useState<string | ArrayBuffer>()

  const handleOpenNewPost = () => setShowNewPost(true);
  const handleCloseNewPost = () => setShowNewPost(false);
  const handleConfirmNewPost = () => {
    if(createPost.desc != '') {
      createPostFunc(props.user._id,createPost.desc,new Date(),postImg,createPost.email,createPost.password)
      .then(()=>{
        window.location.reload()
      })
    } else {
      window.alert('Campo de descrição vazio!')
    }
  }
  const handleModalChangeText = (value:React.ChangeEvent<HTMLTextAreaElement>):void => {
    setCreatePost({
      ...createPost,
      desc: value.target.value
    })
  }

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

      <ModalTemplate
        title="Novo post"
        sendImgDesc="Inserir foto no post"
        onTypingText={handleModalChangeText}
        onConfirm={handleConfirmNewPost}
        confirmText="Postar publicação"
        handleClose={handleCloseNewPost}
        showModal={showNewPost}
        inputFileImg={inputFileNewPost}
        textDesc="Descrição: "
        textAreaRows={5}
        textMaxLength={140}
        previewImg={postImg}
      />

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

export default SendPost
