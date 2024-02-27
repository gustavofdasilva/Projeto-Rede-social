import React from 'react'

type Props = {
  userName: string,
  postData: Date,
  desc: string,
}

const Post = (props: Props) => {
  return (
    <section className='p-3 bg-light m-3'>
      <div className='d-flex align-items-center mb-4'>
        <img src="https://placehold.co/120x120" alt="#" width={60}/>
        <p className='ms-2'>{props.userName} - {props.postData.getTime()}</p>
      </div>
      <p>{props.desc}</p>
      <img src="https://placehold.co/600x400" alt="#" className='w-100'/>
    </section>
  )
}

export default Post
