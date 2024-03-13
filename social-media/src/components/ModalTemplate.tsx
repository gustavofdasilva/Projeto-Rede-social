import { Button, Modal } from 'react-bootstrap'
import CroppedImage from './CroppedImage'

type Props = {
    handleClose: ()=>void,
    showModal: boolean,
    title: string,
    sendImgDesc: string,
    textDesc: string,
    onTypingText: (value: React.ChangeEvent<HTMLTextAreaElement>)=>void,
    textAreaRows: number,
    textMaxLength: number,
    onConfirm: ()=>void,
    confirmText: string,
    previewImg?: ArrayBuffer | string,
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
            <textarea name="desc" id="desc" cols={30} maxLength={props.textMaxLength} rows={props.textAreaRows} className="input-group-text text-start text-break" onChange={(value)=>props.onTypingText(value)}>
            </textarea>
          </div>
          {props.previewImg && <CroppedImage width={200} height={200} filePath={props.previewImg} className="align-self-center"/>}
          <Button variant="outline-primary" className="mt-3 mb-3" onClick={()=>{props.inputFileImg.current?.click()}}>{props.sendImgDesc}</Button>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={props.onConfirm}>{props.confirmText}</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalTemplate
