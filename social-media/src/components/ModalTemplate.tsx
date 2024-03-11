import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { Button, Modal } from 'react-bootstrap'
import CroppedImage from './CroppedImage'

type Props = {
    handleClose: ()=>void,
    handleOpen: ()=>void,
    showModal: boolean,
    title: string,
    sendImgDesc: string,
    textDesc: string,
    onTypingText: ()=>ChangeEventHandler<HTMLTextAreaElement> | undefined,
    onConfirm: ()=>MouseEventHandler<HTMLButtonElement> | undefined,
    previewImg: string,
    inputFileImg: React.MutableRefObject<HTMLInputElement | null>, //useRef<HTMLInputElement | null>
}

const ModalTemplate = (props:Props) => {
  return (
    <Modal show={props.showModal} onHide={props.handleClose} className="d-flex justify-content-center align-items-center"> {/*New Post*/}
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 d-flex flex-column">
          <div className="d-flex flex-row mb-3 mt-3">
            <p className="m-0 me-4 fs-5">{props.textDesc}</p>
            <textarea name="desc" id="desc" cols={30} rows={5} className="input-group-text text-start" onChange={props.onTypingText()}>
            </textarea>
          </div>
          {props.previewImg && <CroppedImage width={200} height={200} filePath={props.previewImg} className="align-self-center"/>}
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>{props.inputFileImg.current?.click()}}>{props.sendImgDesc}</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={props.onConfirm()}>Postar publicação</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalTemplate
