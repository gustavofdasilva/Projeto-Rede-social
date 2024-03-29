import React from 'react'
import CroppedImage from './CroppedImage'
import { formatDate } from '../utils/general'

type Props = {
  userName: string,
  postData: Date,
  desc: string,
  img?: string,
  userImg?: string,
}

const Post = (props: Props) => {
  return (
    <section className='p-3 bg-light m-3 rounded'>
      <div className='d-flex align-items-start mb-3'>
          <CroppedImage width={60} height={60} filePath={props.userImg}></CroppedImage>
          <div>
            <p className='m-0 ms-3 fs-4 fw-semibold'>{props.userName}</p>
            <p className='m-0 ms-3 fs-6'>{formatDate(props.postData)}</p>
          </div>
      </div>
      <p>{props.desc}</p>
      {props.img && <CroppedImage width={600} height={400} filePath={props.img}></CroppedImage>}
    </section>
  )
}

export default Post
